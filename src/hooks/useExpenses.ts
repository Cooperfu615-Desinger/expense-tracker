import { useState, useEffect, useCallback } from 'react';
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    writeBatch,
} from 'firebase/firestore';
import { db } from '../utils/firebase';
import type { Expense, StatsView, StatsData } from '../types/expense';

// Firestore collection name
const EXPENSES_COLLECTION = 'expenses';

interface UseExpensesReturn {
    expenses: Expense[];
    loading: boolean;
    addExpense: (expense: Omit<Expense, 'id'>) => Promise<void>;
    deleteExpense: (id: string) => Promise<void>;
    clearAllExpenses: () => Promise<void>;
    getDailyExpenses: (date: string) => Expense[];
    getDailyTotal: (date: string) => number;
    getStatsData: (date: string, view: StatsView) => StatsData;
}

export const useExpenses = (): UseExpensesReturn => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);

    // Subscribe to Firestore expenses collection with real-time updates
    useEffect(() => {
        const expensesRef = collection(db, EXPENSES_COLLECTION);
        const q = query(expensesRef, orderBy('date', 'desc'));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const expensesData: Expense[] = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                } as Expense));
                setExpenses(expensesData);
                setLoading(false);
            },
            (error) => {
                console.error('Error fetching expenses:', error);
                setLoading(false);
            }
        );

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const addExpense = useCallback(async (expense: Omit<Expense, 'id'>) => {
        try {
            const expensesRef = collection(db, EXPENSES_COLLECTION);
            await addDoc(expensesRef, {
                description: expense.description,
                amount: expense.amount,
                date: expense.date,
                type: expense.type,
            });
        } catch (error) {
            console.error('Error adding expense:', error);
            throw error;
        }
    }, []);

    const deleteExpense = useCallback(async (id: string) => {
        try {
            const expenseRef = doc(db, EXPENSES_COLLECTION, id);
            await deleteDoc(expenseRef);
        } catch (error) {
            console.error('Error deleting expense:', error);
            throw error;
        }
    }, []);

    const clearAllExpenses = useCallback(async () => {
        try {
            const batch = writeBatch(db);
            expenses.forEach((expense) => {
                const expenseRef = doc(db, EXPENSES_COLLECTION, expense.id);
                batch.delete(expenseRef);
            });
            await batch.commit();
        } catch (error) {
            console.error('Error clearing expenses:', error);
            throw error;
        }
    }, [expenses]);

    const getDailyExpenses = useCallback(
        (date: string): Expense[] => {
            return expenses.filter((e) => e.date === date);
        },
        [expenses]
    );

    const getDailyTotal = useCallback(
        (date: string): number => {
            return getDailyExpenses(date).reduce((sum, e) => sum + e.amount, 0);
        },
        [getDailyExpenses]
    );

    const getStatsData = useCallback(
        (selectedDate: string, statsView: StatsView): StatsData => {
            if (!selectedDate)
                return { filtered: [], total: 0, cash: 0, card: 0, chartData: [] };

            const [y, m, d] = selectedDate.split('-').map(Number);
            const current = new Date(y, m - 1, d);

            let start: Date;
            let end: Date;

            switch (statsView) {
                case 'daily':
                    start = current;
                    end = current;
                    break;
                case 'weekly': {
                    const day = current.getDay();
                    const diff = current.getDate() - day;
                    start = new Date(current);
                    start.setDate(diff);
                    start.setHours(0, 0, 0, 0);

                    end = new Date(start);
                    end.setDate(start.getDate() + 6);
                    end.setHours(23, 59, 59, 999);
                    break;
                }
                case 'monthly':
                    start = new Date(y, m - 1, 1);
                    end = new Date(y, m, 0, 23, 59, 59, 999);
                    break;
                case 'yearly':
                    start = new Date(y, 0, 1);
                    end = new Date(y, 11, 31, 23, 59, 59, 999);
                    break;
                default:
                    start = current;
                    end = current;
            }

            const filtered = expenses.filter((e) => {
                if (statsView === 'daily') {
                    return e.date === selectedDate;
                }
                const [ey, em, ed] = e.date.split('-').map(Number);
                const expDate = new Date(ey, em - 1, ed);
                return expDate >= start && expDate <= end;
            });

            const total = filtered.reduce((sum, e) => sum + e.amount, 0);
            const cash = filtered
                .filter((e) => e.type === 'cash' || !e.type)
                .reduce((sum, e) => sum + e.amount, 0);
            const card = filtered
                .filter((e) => e.type === 'card')
                .reduce((sum, e) => sum + e.amount, 0);

            // Group for Chart
            const grouped = filtered.reduce(
                (acc, curr) => {
                    const key = curr.description;
                    if (!acc[key]) acc[key] = 0;
                    acc[key] += curr.amount;
                    return acc;
                },
                {} as Record<string, number>
            );

            const chartData = Object.entries(grouped)
                .map(([name, value]) => ({ name, value }))
                .sort((a, b) => b.value - a.value);

            return { filtered, total, cash, card, chartData };
        },
        [expenses]
    );

    return {
        expenses,
        loading,
        addExpense,
        deleteExpense,
        clearAllExpenses,
        getDailyExpenses,
        getDailyTotal,
        getStatsData,
    };
};

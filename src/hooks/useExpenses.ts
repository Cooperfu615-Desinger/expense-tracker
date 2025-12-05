import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Expense, StatsView, StatsData } from '../types/expense';
import { generateId } from '../utils';
import { STORAGE_KEY } from '../constants/chart';

interface UseExpensesReturn {
    expenses: Expense[];
    addExpense: (expense: Omit<Expense, 'id'>) => void;
    deleteExpense: (id: string) => void;
    clearAllExpenses: () => void;
    getDailyExpenses: (date: string) => Expense[];
    getDailyTotal: (date: string) => number;
    getStatsData: (date: string, view: StatsView) => StatsData;
}

export const useExpenses = (): UseExpensesReturn => {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setExpenses(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse expenses', e);
            }
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    }, [expenses]);

    const addExpense = useCallback((expense: Omit<Expense, 'id'>) => {
        const newExpense: Expense = {
            ...expense,
            id: generateId(),
        };
        setExpenses((prev) => [...prev, newExpense]);
    }, []);

    const deleteExpense = useCallback((id: string) => {
        setExpenses((prev) => prev.filter((ex) => ex.id !== id));
    }, []);

    const clearAllExpenses = useCallback(() => {
        setExpenses([]);
    }, []);

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
        addExpense,
        deleteExpense,
        clearAllExpenses,
        getDailyExpenses,
        getDailyTotal,
        getStatsData,
    };
};

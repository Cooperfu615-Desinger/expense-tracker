import React from 'react';
import type { Expense } from '../types/expense';
import { ExpenseItem } from './ExpenseItem';
import { formatMoney } from '../utils';

interface ExpenseListProps {
    expenses: Expense[];
    total: number;
    onDelete: (id: string, e: React.MouseEvent) => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, total, onDelete }) => {
    return (
        <div className="flex-1 overflow-y-auto space-y-4 px-2 pb-24 pt-32 custom-scrollbar">
            {expenses.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-300 pointer-events-none select-none pb-20">
                    <p className="text-lg italic opacity-50 font-skranji">
                        Click anywhere to write...
                    </p>
                </div>
            ) : (
                expenses.map((expense) => (
                    <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} />
                ))
            )}

            {total > 0 && (
                <div className="mt-8 pt-4 border-t-4 border-black flex justify-between items-center">
                    <span className="font-bold text-sm uppercase tracking-widest font-skranji">
                        Total
                    </span>
                    <span className="font-bold text-2xl font-skranji">{formatMoney(total)}</span>
                </div>
            )}
        </div>
    );
};

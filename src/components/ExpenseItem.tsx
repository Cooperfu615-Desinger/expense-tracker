import React from 'react';
import { Trash2, Banknote, CreditCard } from 'lucide-react';
import type { Expense } from '../types/expense';

interface ExpenseItemProps {
    expense: Expense;
    onDelete: (id: string, e: React.MouseEvent) => void;
}

export const ExpenseItem: React.FC<ExpenseItemProps> = ({ expense, onDelete }) => {
    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-end justify-between border-b border-black/10 border-dashed pb-2 group"
        >
            <span className="font-medium text-lg tracking-wide font-sans truncate pr-4">
                {expense.description}
            </span>
            <div className="flex items-center gap-2 shrink-0">
                <div
                    title={expense.type === 'card' ? 'Credit Card' : 'Cash'}
                    className="text-black/60"
                >
                    {expense.type === 'card' ? <CreditCard size={18} /> : <Banknote size={18} />}
                </div>
                <span className="font-bold text-lg font-skranji w-[80px] text-right">
                    {expense.amount}
                </span>
                <button
                    onClick={(e) => onDelete(expense.id, e)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-red-600 w-6"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
};

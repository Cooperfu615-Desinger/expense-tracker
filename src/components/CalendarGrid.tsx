import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Expense } from '../types/expense';
import { dayToDateString } from '../utils';

interface CalendarGridProps {
    year: number;
    month: number;
    daysInMonth: number;
    firstDayOfMonth: number;
    selectedDate: string;
    expenses: Expense[];
    onDayClick: (dateStr: string) => void;
    onPrevMonth: () => void;
    onNextMonth: () => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
    year,
    month,
    daysInMonth,
    firstDayOfMonth,
    selectedDate,
    expenses,
    onDayClick,
    onPrevMonth,
    onNextMonth,
}) => {
    const blanks = Array.from({ length: firstDayOfMonth });
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4 font-skranji">
                <button
                    onClick={onPrevMonth}
                    className="p-1 hover:bg-gray-100 rounded-full"
                >
                    <ChevronLeft />
                </button>
                <span className="font-bold text-lg">
                    {year} / {month + 1}
                </span>
                <button
                    onClick={onNextMonth}
                    className="p-1 hover:bg-gray-100 rounded-full"
                >
                    <ChevronRight />
                </button>
            </div>
            <div className="grid grid-cols-7 text-center text-sm gap-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d} className="font-bold text-gray-400 py-1 font-skranji">
                        {d}
                    </div>
                ))}
                {blanks.map((_, i) => (
                    <div key={`b-${i}`} />
                ))}
                {days.map((d) => {
                    const dateStr = dayToDateString(year, month, d);
                    const isSelected = dateStr === selectedDate;
                    const hasData = expenses.some((e) => e.date === dateStr);

                    return (
                        <button
                            key={d}
                            onClick={() => onDayClick(dateStr)}
                            className={`
                h-10 w-10 rounded-full flex items-center justify-center text-sm transition-all font-skranji
                ${isSelected ? 'bg-black text-white font-bold' : 'hover:bg-gray-100'}
                ${hasData && !isSelected ? 'font-bold underline decoration-2 decoration-gray-300' : ''}
              `}
                        >
                            {d}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

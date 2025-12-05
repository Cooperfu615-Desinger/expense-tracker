import React from 'react';
import { Modal } from '../ui';
import { CalendarGrid } from '../CalendarGrid';
import type { Expense } from '../../types/expense';

interface CalendarModalProps {
    isOpen: boolean;
    onClose: () => void;
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

export const CalendarModal: React.FC<CalendarModalProps> = ({
    isOpen,
    onClose,
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
    const handleDayClick = (dateStr: string) => {
        onDayClick(dateStr);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="CALENDAR">
            <CalendarGrid
                year={year}
                month={month}
                daysInMonth={daysInMonth}
                firstDayOfMonth={firstDayOfMonth}
                selectedDate={selectedDate}
                expenses={expenses}
                onDayClick={handleDayClick}
                onPrevMonth={onPrevMonth}
                onNextMonth={onNextMonth}
            />
        </Modal>
    );
};

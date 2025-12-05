import { useState, useCallback } from 'react';
import { getDaysInMonth, getFirstDayOfMonth } from '../utils';

interface UseCalendarReturn {
    currentDate: Date;
    year: number;
    month: number;
    daysInMonth: number;
    firstDayOfMonth: number;
    navigatePrevMonth: () => void;
    navigateNextMonth: () => void;
    setCurrentDate: (date: Date) => void;
}

export const useCalendar = (initialDate?: Date): UseCalendarReturn => {
    const [currentDate, setCurrentDate] = useState<Date>(initialDate || new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const navigatePrevMonth = useCallback(() => {
        setCurrentDate(new Date(year, month - 1, 1));
    }, [year, month]);

    const navigateNextMonth = useCallback(() => {
        setCurrentDate(new Date(year, month + 1, 1));
    }, [year, month]);

    return {
        currentDate,
        year,
        month,
        daysInMonth,
        firstDayOfMonth,
        navigatePrevMonth,
        navigateNextMonth,
        setCurrentDate,
    };
};

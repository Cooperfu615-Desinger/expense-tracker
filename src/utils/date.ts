/**
 * Get the number of days in a month
 */
export const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
};

/**
 * Get the day of week for the first day of the month (0 = Sunday)
 */
export const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
};

/**
 * Format date object to YYYY-MM-DD string
 */
export const formatDateString = (date: Date): string => {
    const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return offsetDate.toISOString().split('T')[0];
};

/**
 * Get formatted date display (dateLine and dayLine)
 */
export const getFormattedDate = (
    isoDateStr: string
): { dateLine: string; dayLine: string } => {
    const [y, m, d] = isoDateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);

    // Line 1: 2025/11/25
    const dateLine = isoDateStr.replace(/-/g, '/');

    // Line 2: TUESDAY
    const dayLine = dateObj
        .toLocaleDateString('en-US', { weekday: 'long' })
        .toUpperCase();

    return { dateLine, dayLine };
};

/**
 * Get today's date as YYYY-MM-DD string
 */
export const getTodayString = (): string => {
    return new Date().toISOString().split('T')[0];
};

/**
 * Convert calendar day to YYYY-MM-DD string
 */
export const dayToDateString = (year: number, month: number, day: number): string => {
    return new Date(year, month, day).toLocaleDateString('en-CA'); // YYYY-MM-DD
};

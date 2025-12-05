// Expense type definition
export interface Expense {
    id: string;
    date: string; // YYYY-MM-DD format
    description: string;
    amount: number;
    type: 'cash' | 'card';
}

// Stats view type
export type StatsView = 'daily' | 'weekly' | 'monthly' | 'yearly';

// Stats data type
export interface StatsData {
    filtered: Expense[];
    total: number;
    cash: number;
    card: number;
    chartData: ChartDataItem[];
}

// Chart data item
export interface ChartDataItem {
    name: string;
    value: number;
}

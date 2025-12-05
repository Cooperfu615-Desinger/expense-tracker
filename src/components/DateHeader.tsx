import React from 'react';
import { getFormattedDate } from '../utils';

interface DateHeaderProps {
    selectedDate: string;
}

export const DateHeader: React.FC<DateHeaderProps> = ({ selectedDate }) => {
    const { dateLine, dayLine } = getFormattedDate(selectedDate);

    return (
        <div className="absolute top-8 left-0 w-full text-center z-10 pointer-events-none">
            <p className="text-xl font-bold text-gray-500 font-skranji tracking-wider mb-0 leading-none">
                {dateLine}
            </p>
            <h1 className="text-4xl font-black tracking-widest text-black font-skranji leading-tight">
                {dayLine}
            </h1>
        </div>
    );
};

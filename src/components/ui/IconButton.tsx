import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface IconButtonProps {
    Icon: LucideIcon;
    onClick?: (e: React.MouseEvent) => void;
    label: string;
    className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
    Icon,
    onClick,
    label,
    className = '',
}) => (
    <button
        onClick={(e) => {
            e.stopPropagation();
            onClick?.(e);
        }}
        className={`p-3 rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[4px] active:translate-x-[4px] transition-all flex items-center justify-center group relative ${className}`}
        title={label}
    >
        <Icon size={24} strokeWidth={2} />
        {/* Tooltip for desktop */}
        <span className="absolute left-full ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 hidden sm:block font-sans">
            {label}
        </span>
    </button>
);

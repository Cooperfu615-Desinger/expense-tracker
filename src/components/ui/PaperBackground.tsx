import React from 'react';

interface PaperBackgroundProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export const PaperBackground: React.FC<PaperBackgroundProps> = ({
    children,
    onClick,
    className = '',
}) => (
    <div
        onClick={onClick}
        className={`relative bg-[#fdfdfd] text-black w-full h-full overflow-hidden ${className}`}
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
    >
        {children}
    </div>
);

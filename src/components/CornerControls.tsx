import React from 'react';
import { Home, Settings, PieChart as PieChartIcon, Calendar as CalendarIcon } from 'lucide-react';
import { IconButton } from './ui';

interface CornerControlsProps {
    onHomeClick: () => void;
    onSettingsClick: () => void;
    onCalendarClick: () => void;
    onStatsClick: () => void;
}

export const CornerControls: React.FC<CornerControlsProps> = ({
    onHomeClick,
    onSettingsClick,
    onCalendarClick,
    onStatsClick,
}) => {
    return (
        <>
            {/* Top Left: Home - RED #ff7171 */}
            <div className="absolute top-6 left-6 z-20">
                <IconButton
                    Icon={Home}
                    label="Back to Today"
                    className="bg-[#ff7171]"
                    onClick={onHomeClick}
                />
            </div>

            {/* Top Right: Settings - BLUE #5399f8 */}
            <div className="absolute top-6 right-6 z-20">
                <IconButton
                    Icon={Settings}
                    label="Settings"
                    className="bg-[#5399f8]"
                    onClick={onSettingsClick}
                />
            </div>

            {/* Bottom Left: Calendar - GREEN #1dcd78 */}
            <div className="absolute bottom-8 left-6 z-20">
                <IconButton
                    Icon={CalendarIcon}
                    label="Select Date"
                    className="bg-[#1dcd78]"
                    onClick={onCalendarClick}
                />
            </div>

            {/* Bottom Right: Stats - YELLOW #ffbd59 */}
            <div className="absolute bottom-8 right-6 z-20">
                <IconButton
                    Icon={PieChartIcon}
                    label="Statistics"
                    className="bg-[#ffbd59]"
                    onClick={onStatsClick}
                />
            </div>
        </>
    );
};

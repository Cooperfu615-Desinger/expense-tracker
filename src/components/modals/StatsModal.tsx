import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { Banknote, CreditCard } from 'lucide-react';
import { Modal } from '../ui';
import type { StatsView, StatsData } from '../../types/expense';
import { formatMoney } from '../../utils';
import { CHART_COLORS } from '../../constants/chart';

interface StatsModalProps {
    isOpen: boolean;
    onClose: () => void;
    statsView: StatsView;
    onStatsViewChange: (view: StatsView) => void;
    statsData: StatsData;
}

export const StatsModal: React.FC<StatsModalProps> = ({
    isOpen,
    onClose,
    statsView,
    onStatsViewChange,
    statsData,
}) => {
    const views: StatsView[] = ['daily', 'weekly', 'monthly', 'yearly'];

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="STATISTICS">
            {/* View Switcher */}
            <div className="flex justify-center gap-2 mb-6">
                {views.map((view) => (
                    <button
                        key={view}
                        onClick={() => onStatsViewChange(view)}
                        className={`
              px-3 py-1 text-sm font-bold rounded-full border border-black transition-all uppercase
              ${statsView === view
                                ? 'bg-black text-white'
                                : 'bg-transparent text-gray-500 border-transparent hover:bg-gray-100'
                            }
            `}
                    >
                        {view}
                    </button>
                ))}
            </div>

            <div className="h-64 w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={statsData.chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {statsData.chartData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                            ))}
                        </Pie>
                        <RechartsTooltip formatter={(val) => formatMoney(val as number)} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="text-center mb-6">
                <span className="text-gray-500 text-sm font-skranji uppercase tracking-wide">
                    {statsView === 'daily' && 'Daily Total'}
                    {statsView === 'weekly' && 'Weekly Total'}
                    {statsView === 'monthly' && 'Monthly Total'}
                    {statsView === 'yearly' && 'Yearly Total'}
                </span>
                <div className="text-3xl font-bold border-b-4 border-black inline-block px-4 font-skranji mb-2 mt-1">
                    {formatMoney(statsData.total)}
                </div>

                {/* Payment Method Breakdown */}
                <div className="flex justify-center gap-6 mt-4 text-sm font-sans text-gray-600">
                    <div className="flex items-center gap-1">
                        <Banknote size={16} />
                        <span>{formatMoney(statsData.cash)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <CreditCard size={16} />
                        <span>{formatMoney(statsData.card)}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                {statsData.chartData.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ background: CHART_COLORS[idx % CHART_COLORS.length] }}
                            />
                            <span className="font-medium font-sans">{item.name}</span>
                        </div>
                        <span className="font-bold font-skranji">{formatMoney(item.value)}</span>
                    </div>
                ))}
            </div>
        </Modal>
    );
};

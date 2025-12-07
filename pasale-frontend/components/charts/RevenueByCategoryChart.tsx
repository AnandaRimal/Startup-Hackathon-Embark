"use client"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { REVENUE_BY_CATEGORY } from '@/utils/mockData';

export function RevenueByCategoryChart() {
    return (
        <div className="w-full">
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={REVENUE_BY_CATEGORY}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(entry) => `${entry.percent ? (entry.percent * 100).toFixed(0) : 0}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {REVENUE_BY_CATEGORY.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="bg-white/95 backdrop-blur-sm p-3 border border-slate-200 rounded-xl shadow-lg">
                                            <p className="font-semibold text-slate-800">{data.name}</p>
                                            <p className="text-sm text-slate-600">NPR {data.value.toLocaleString()}</p>
                                            <p className="text-xs text-slate-500">{data.percentage}%</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="mt-4 space-y-2">
                {REVENUE_BY_CATEGORY.map((category) => (
                    <div key={category.name} className="flex items-center justify-between px-2 py-1.5 hover:bg-slate-50 rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: category.color }}
                            />
                            <span className="text-sm font-medium text-slate-700">{category.name}</span>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-bold text-slate-900">NPR {category.value.toLocaleString()}</p>
                            <p className="text-xs text-slate-500">{category.percentage}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

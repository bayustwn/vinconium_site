import React from 'react';

interface ProgressBarProps {
    current: number;
    total: number;
    color: string;
    label: string;
}

export function ProgressBar({ current, total, color, label }: ProgressBarProps) {
    const percentage = Math.min(100, Math.max(0, (current / total) * 100));

    return (
        <div className="flex flex-col gap-1 w-full max-w-[200px]">
            <div className="flex justify-between text-[10px] text-white/70 uppercase">
                <span>{label}</span>
                <span>{current}/{total}</span>
            </div>
            <div className="h-4 border-2 border-black bg-black flex p-[2px]">
                <div
                    className="h-full transition-all duration-500 shadow-inner"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: color,
                        boxShadow: `inset -2px -2px 0px 0px rgba(0,0,0,0.3)`
                    }}
                />
            </div>
        </div>
    );
}

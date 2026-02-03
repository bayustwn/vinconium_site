"use client";

import React, { useState, useEffect } from 'react';
import { ProgressBar } from './ProgressBar';

export function HUD({ stats }: { stats?: { subscribers: string, totalViews: string, videoCount?: string } }) {
    const subscribers = stats?.subscribers || 'SCANNING...';
    const videoCount = stats?.videoCount || '---';
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 p-2 md:p-4 transition-all duration-300 pointer-events-none border-b-2 ${isScrolled
            ? 'bg-background/90 backdrop-blur-sm border-white/5 shadow-lg'
            : 'bg-transparent border-transparent'
            }`}>
            <div className="flex justify-between items-start w-full max-w-7xl mx-auto pointer-events-auto">
                <div className="flex gap-2 md:gap-4 items-center bg-black/60 backdrop-blur-md border-2 border-white/10 p-2 md:p-4 shadow-pixel max-w-[80%] md:max-w-none">
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-neon-green border-2 border-black shadow-pixel-sm overflow-hidden shrink-0">
                        <img
                            src="/logo.webp"
                            alt="Vinconium Logo"
                            className="w-full h-full object-cover image-rendering-pixelated"
                        />
                    </div>
                    <div className="flex flex-col gap-1 md:gap-2 overflow-hidden">
                        <div className="flex items-center gap-2 md:gap-4">
                            <span className="text-[10px] md:text-sm font-bold tracking-widest text-white truncate">VINCONIUM</span>
                            <span className="text-[8px] md:text-[10px] bg-retro-yellow text-black px-1 md:px-2 py-0.5 font-bold shrink-0">LVL 99</span>
                        </div>
                        <div className="flex gap-2 md:gap-4">
                            <ProgressBar label="HP" current={850} total={1000} color="#ff0044" />
                            <div className="hidden sm:block">
                                <ProgressBar label="XP" current={1240} total={2500} color="#39ff14" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-1 md:gap-2 bg-black/60 backdrop-blur-md border-2 border-white/10 p-2 md:p-4 shadow-pixel">
                    <div className="text-[8px] md:text-[10px] text-neon-green/80 uppercase tracking-widest animate-pulse">SYSTEM_STABLE</div>
                    <div className="flex gap-3 md:gap-6">
                        <div className="text-right">
                            <p className="text-[8px] md:text-[10px] text-gray-400">DATA</p>
                            <p className="text-[10px] md:text-sm text-retro-yellow font-bold tracking-tighter">{videoCount} Vids</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[8px] md:text-[10px] text-gray-400">SUBS</p>
                            <p className="text-[10px] md:text-sm text-white font-bold tracking-tighter">{subscribers}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

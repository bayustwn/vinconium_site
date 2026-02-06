"use client";

import React from 'react';
import { PixelCard } from './PixelCard';
import { useTerminal } from '@/hooks/useTerminal';
import { TerminalProps } from '@/lib/terminal/types';

export function Terminal({ onClose }: TerminalProps) {
    const {
        input,
        setInput,
        history,
        theme,
        currentTheme,
        isProcessing,
        suggestion,
        inputRef,
        scrollRef,
        handleKeyDown,
        handleSubmit
    } = useTerminal(onClose);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-black/80 backdrop-blur-md pointer-events-auto overflow-hidden">
            <div className="w-full max-w-4xl h-full max-h-[85vh] md:max-h-[75vh] flex flex-col gap-2 md:gap-4 animate-in zoom-in duration-300">
                <PixelCard
                    title="VINCO_CORE_TERMINAL"
                    variant="primary"
                    onClose={onClose}
                    className={`w-full flex-1 overflow-hidden border-2 transition-colors duration-500 ${theme.bg} ${theme.border}`}
                >

                    <div
                        ref={scrollRef}
                        className={`flex-1 overflow-y-auto font-mono text-[10px] md:text-xs p-3 md:p-6 space-y-1 selection:bg-white selection:text-black scrollbar-thin scrollbar-thumb-white/10 ${theme.text}`}
                        onClick={() => inputRef.current?.focus()}
                    >
                        {history.map((line, i) => (
                            <div key={i} className={`whitespace-pre-wrap min-h-[1.2em] ${line.startsWith('vinco@system') ? `${theme.accent} ${theme.glow}` : ''}`}>
                                {line}
                            </div>
                        ))}

                        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
                            <span className={`shrink-0 font-bold ${theme.accent}`}>vinco@system:~$</span>
                            <div className="flex-1 relative flex items-center">
                                {isProcessing && (
                                    <span className="absolute inset-0 opacity-50 animate-pulse z-10">PROCESSING_SIGNAL...</span>
                                )}

                                {/* Ghost Suggestion */}
                                {!isProcessing && suggestion && (
                                    <div className="absolute inset-0 pointer-events-none flex items-center">
                                        <span className="opacity-0">{input}</span>
                                        <span className="opacity-20">{suggestion.slice(input.length)}</span>
                                    </div>
                                )}

                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className={`flex-1 bg-transparent border-none outline-none ${theme.text} ${theme.caret} font-mono placeholder:opacity-20 ${isProcessing ? 'opacity-0' : 'opacity-100'} relative z-10`}
                                    autoComplete="off"
                                    spellCheck="false"
                                    placeholder="Type 'help'..."
                                />
                            </div>
                        </form>
                    </div>
                </PixelCard>

                <div className={`p-3 md:p-4 ${theme.bg} border-2 ${theme.border} shadow-pixel flex justify-between items-center text-[7px] md:text-[9px] text-gray-500 uppercase tracking-[0.2em] animate-in slide-in-from-bottom-2 duration-500 delay-200`}>
                    <div className="flex gap-4 md:gap-8">
                        <span className="flex items-center gap-2">
                            <span className="opacity-30">LOC:</span> LAB_7
                        </span>
                        <span className="hidden xs:inline-flex items-center gap-2">
                            <span className="opacity-30">THEME:</span> {currentTheme}
                        </span>
                        <span className="hidden sm:inline-flex items-center gap-2">
                            <span className="opacity-30">PID:</span> {1000 + history.length}
                        </span>
                    </div>
                    <span className={`animate-pulse flex items-center gap-2 font-bold ${theme.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${theme.text.replace('text-', 'bg-')} ${theme.glow}`}></span>
                        ACTIVE_UPLINK
                    </span>
                </div>
            </div>
        </div>
    );
}

import React from 'react';

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'neon' | 'pink' | 'retro';
}

export function PixelButton({ children, className = '', variant = 'neon', ...props }: PixelButtonProps) {
    const variants = {
        neon: 'bg-neon-green text-black hover:bg-white border-black',
        pink: 'bg-cyber-pink text-white hover:bg-white hover:text-black border-black',
        retro: 'bg-retro-yellow text-black hover:bg-white border-black',
    };

    return (
        <button
            className={`
                relative
                px-6 py-3
                border-4
                ${variants[variant]}
                font-bold 
                text-[10px] md:text-sm
                shadow-pixel 
                active:translate-x-[2px] active:translate-y-[2px] active:shadow-pixel-sm
                transition-all cursor-pointer
                uppercase tracking-[0.2em]
                ${className}
            `}
            {...props}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>
            <div className="absolute inset-0 border-t-2 border-l-2 border-white/30 pointer-events-none"></div>
            <div className="absolute inset-0 border-b-2 border-r-2 border-black/30 pointer-events-none"></div>
        </button>
    );
}

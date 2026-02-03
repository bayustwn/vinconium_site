import React from 'react';

export function GlitchText({ text, className = '', as: Component = 'span' }: { text: string; className?: string; as?: React.ElementType }) {
    return (
        <Component className={`relative inline-block font-bold group ${className}`}>
            <span className="absolute top-0 left-0 -ml-[2px] text-cyber-pink opacity-70 animate-glitch-1 w-full h-full block" aria-hidden="true">{text}</span>
            <span className="absolute top-0 left-0 ml-[2px] text-neon-green opacity-70 animate-glitch-2 w-full h-full block" aria-hidden="true">{text}</span>
            <span className="relative z-10">{text}</span>
        </Component>
    );
}

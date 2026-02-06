export function GlitchText({ text, className = '', as: Component = 'span', style = {} }: { text: string; className?: string; as?: React.ElementType; style?: React.CSSProperties }) {
    return (
        <Component
            className={`grid group w-max isolate whitespace-nowrap ${className}`}
            style={{
                ...style
            }}
        >
            <span className="[grid-area:1/1] -ml-[1px] text-cyber-pink opacity-70 animate-glitch-1 pointer-events-none select-none" aria-hidden="true">{text}</span>
            <span className="[grid-area:1/1] ml-[1px] text-neon-green opacity-70 animate-glitch-2 pointer-events-none select-none" aria-hidden="true">{text}</span>
            <span className="[grid-area:1/1] relative z-10">{text}</span>
        </Component>
    );
}
import { ThemeName, ThemeStyles } from './types';

export const THEMES: Record<ThemeName, ThemeStyles> = {
    matrix: {
        text: 'text-neon-green',
        border: 'border-neon-green/30',
        bg: 'bg-black',
        accent: 'text-cyber-pink',
        caret: 'caret-white',
        glow: 'shadow-[0_0_5px_rgba(57,255,20,0.3)]'
    },
    neon: {
        text: 'text-cyan-400',
        border: 'border-cyan-500/30',
        bg: 'bg-[#05051a]',
        accent: 'text-fuchsia-500',
        caret: 'caret-fuchsia-500',
        glow: 'shadow-[0_0_8px_rgba(6,182,212,0.4)]'
    },
    amber: {
        text: 'text-retro-yellow',
        border: 'border-retro-yellow/30',
        bg: 'bg-[#1a1300]',
        accent: 'text-white',
        caret: 'caret-retro-yellow',
        glow: 'shadow-[0_0_5px_rgba(255,170,0,0.3)]'
    },
    ghost: {
        text: 'text-white',
        border: 'border-white/20',
        bg: 'bg-neutral-900',
        accent: 'text-neutral-400',
        caret: 'caret-white',
        glow: 'shadow-[0_0_5px_rgba(255,255,255,0.1)]'
    }
};

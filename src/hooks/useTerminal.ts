import { useState, useRef, useEffect, useMemo } from 'react';
import { ThemeName, CommandResult } from '../lib/terminal/types';
import { THEMES } from '../lib/terminal/themes';
import { INITIAL_HISTORY, COMMANDS } from '../lib/terminal/constants';
import { executeCommand } from '../lib/terminal/commands';

export function useTerminal(onClose: () => void) {
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentTheme, setCurrentTheme] = useState<ThemeName>('matrix');
    const [history, setHistory] = useState<string[]>(INITIAL_HISTORY);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const theme = THEMES[currentTheme];

    const suggestion = useMemo(() => {
        if (!input.trim() || isProcessing) return '';
        const match = COMMANDS.find(c => c.startsWith(input.toLowerCase()));
        return match && match !== input.toLowerCase() ? match : '';
    }, [input, isProcessing]);

    useEffect(() => {
        if (!isProcessing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isProcessing]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = async (cmd: string) => {
        const fullCmd = cmd.trim();
        if (!fullCmd) return;

        setHistory(prev => [...prev, `vinco@system:~$ ${fullCmd}`]);
        setCommandHistory(prev => [fullCmd, ...prev]);
        setHistoryIndex(-1);
        setIsProcessing(true);

        const result: CommandResult = await executeCommand(
            fullCmd,
            currentTheme,
            (name) => !!THEMES[name as ThemeName]
        );

        switch (result.type) {
            case 'CLEAR':
                setHistory([]);
                break;
            case 'THEME':
                const newTheme = result.value as ThemeName;
                setCurrentTheme(newTheme);
                setHistory(prev => [...prev, `SYSTEM: Theme changed to [${newTheme.toUpperCase()}]`]);
                break;
            case 'EXIT':
                onClose();
                break;
            case 'PING':
                const lines = result.value as string[];
                setHistory(prev => [...prev, `PINGING ${fullCmd.split(' ')[1] || 'google.com'}...`]);
                for (const line of lines) {
                    await new Promise(resolve => setTimeout(resolve, 200));
                    setHistory(prev => [...prev, line]);
                }
                break;
            case 'OUTPUT':
                if (Array.isArray(result.value)) {
                    setHistory(prev => [...prev, ...result.value as string[]]);
                }
                break;
        }

        setIsProcessing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (isProcessing) return;

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            const nextIndex = historyIndex + 1;
            if (nextIndex < commandHistory.length) {
                setHistoryIndex(nextIndex);
                setInput(commandHistory[nextIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = historyIndex - 1;
            if (nextIndex >= 0) {
                setHistoryIndex(nextIndex);
                setInput(commandHistory[nextIndex]);
            } else {
                setHistoryIndex(-1);
                setInput('');
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            if (suggestion) {
                setInput(suggestion);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isProcessing || !input.trim()) return;
        handleCommand(input);
        setInput('');
    };

    return {
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
    };
}

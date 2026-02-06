import { ThemeName, CommandResult } from './types';
import { NEOFETCH_LOGO, COLORS_PALETTE } from './constants';

export async function executeCommand(
    fullCmd: string,
    currentTheme: ThemeName,
    isValidTheme: (name: string) => boolean,
    sysContext?: { os: string; browser: string; cpu?: string; device?: string; resolution: string }
): Promise<CommandResult> {
    const [baseCmd, ...args] = fullCmd.toLowerCase().split(' ');

    if (fullCmd.toLowerCase() === 'vinco ganteng') {
        return { type: 'EASTER_EGG' };
    }

    switch (baseCmd) {
        case 'help':
            return {
                type: 'OUTPUT',
                value: [
                    'Available commands:',
                    '  help             - Show this help message',
                    '  about            - About Vinconium',
                    '  theme <name>     - Change theme (matrix, neon, amber, ghost)',
                    '  sysinfo          - Display system statistics',
                    '  clear            - Clear terminal screen',
                    '  exit             - Close terminal',
                ]
            };

        case 'theme':
            const newTheme = args[0] as ThemeName;
            if (isValidTheme(newTheme)) {
                return { type: 'THEME', value: newTheme };
            } else {
                return {
                    type: 'OUTPUT',
                    value: [`ERROR: Theme [${args[0] || 'null'}] not found. Available: matrix, neon, amber, ghost`]
                };
            }

        case 'about':
            return {
                type: 'OUTPUT',
                value: [
                    'VINCONIUM: A playground for technology and science.',
                    'Turning complex concepts into playful transmissions.',
                    'Level 99 Architect authenticated.',
                ]
            };

        case 'clear':
            return { type: 'CLEAR' };

        case 'exit':
            return { type: 'EXIT' };

        case 'sysinfo':
            const info = [
                `vinco@${(sysContext?.browser || 'browser').toLowerCase().replace(/\s/g, '-')}`,
                '------------------',
                `OS: ${sysContext?.os || 'Unknown OS'}`,
                `Host: ${sysContext?.device || 'Web_Environment'}`,
                `Browser: ${sysContext?.browser || 'Unknown'}`,
                `Resolution: ${sysContext?.resolution || 'Unknown'}`,
                `CPU: ${sysContext?.cpu || 'Web-Virtualized'}`,
                `Memory: Private_Heap_Allocated`,
                `Theme: ${currentTheme.toUpperCase()}`,
            ];

            const neofetch: string[] = [];
            const maxLines = Math.max(NEOFETCH_LOGO.length, info.length);
            for (let i = 0; i < maxLines; i++) {
                const l = NEOFETCH_LOGO[i] || ' '.repeat(NEOFETCH_LOGO[0].length);
                const r = info[i] || '';
                neofetch.push(`${l}  ${r}`);
            }
            neofetch.push('');
            neofetch.push(' '.repeat(NEOFETCH_LOGO[0].length + 2) + COLORS_PALETTE);
            return { type: 'OUTPUT', value: neofetch };

        case 'echo':
            return { type: 'OUTPUT', value: [args.join(' ') || ' '] };

        default:
            return {
                type: 'OUTPUT',
                value: [`UNKNOWN_COMMAND: ${baseCmd}. Type "help" for assistance.`]
            };
    }
}

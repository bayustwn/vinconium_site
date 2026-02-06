import { ThemeName, CommandResult } from './types';
import { NEOFETCH_LOGO, COLORS_PALETTE } from './constants';
import { pingHost } from '../network';

export async function executeCommand(
    fullCmd: string,
    currentTheme: ThemeName,
    isValidTheme: (name: string) => boolean
): Promise<CommandResult> {
    const [baseCmd, ...args] = fullCmd.toLowerCase().split(' ');

    switch (baseCmd) {
        case 'help':
            return {
                type: 'OUTPUT',
                value: [
                    'Available commands:',
                    '  help             - Show this help message',
                    '  about            - About Vinconium',
                    '  ping <host>      - Real network ping',
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

        case 'ping':
            const host = args[0] || 'google.com';
            const results = await pingHost(host);
            return { type: 'PING', value: results };

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
                'vinco@vinconium-os',
                '------------------',
                'OS: Vinconium_OS 1.0.0-stable',
                'Host: Sector_Lab_7',
                'Kernel: 5.15.0-vinc-x64',
                'Uptime: 4d 2h 15m',
                'CPU: Transmuter-V9 Quantum',
                'GPU: Neural-Core RX-Pixel',
                'Memory: 7842MiB / 65536MiB',
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

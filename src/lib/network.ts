'use server';

import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export async function pingHost(host: string): Promise<string[]> {
    const sanitizedHost = host.replace(/[^a-zA-Z0-9.-]/g, '');

    if (!sanitizedHost) {
        return ['ERROR: Invalid host address.'];
    }

    try {
        const { stdout, stderr } = await execPromise(`ping -c 4 ${sanitizedHost}`);

        if (stderr) {
            return [stderr];
        }

        return stdout.split('\n').filter(line => line.trim() !== '');
    } catch (error: any) {
        if (error.stdout) {
            return error.stdout.split('\n').filter((line: string) => line.trim() !== '');
        }
        return [`ERROR: Ping failed - ${error.message}`];
    }
}

import 'server-only';

export function readRuntimeEnv(parts: string[]) {
    let key = '';

    for (let index = 0; index < parts.length; index++) {
        key += index === 0 ? parts[index] : `_${parts[index]}`;
    }

    return process.env[key];
}

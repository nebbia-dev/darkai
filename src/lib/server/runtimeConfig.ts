import 'server-only';

function readFirstEnv(names: string[]) {
    for (const name of names) {
        const value = process.env[name];

        if (typeof value === 'string' && value.trim().length > 0) {
            return value.trim();
        }
    }

    return undefined;
}

function parseBoolean(value: string | undefined, fallback: boolean) {
    if (!value) {
        return fallback;
    }

    const normalized = value.trim().toLowerCase();

    if (['true', '1', 'yes', 'on'].includes(normalized)) {
        return true;
    }

    if (['false', '0', 'no', 'off'].includes(normalized)) {
        return false;
    }

    return fallback;
}

function parseNumber(value: string | undefined, fallback: number) {
    if (!value) {
        return fallback;
    }

    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : fallback;
}

function ensureProtocol(value: string) {
    if (/^https?:\/\//i.test(value)) {
        return value;
    }

    return `https://${value}`;
}

function stripTrailingSlash(value: string) {
    return value.replace(/\/+$/, '');
}

function readRequiredEnv(description: string, names: string[]) {
    const value = readFirstEnv(names);

    if (!value) {
        throw new Error(`${description} is not configured`);
    }

    return value;
}

export function getStripeSecretKey() {
    return readRequiredEnv('Stripe secret key', [
        'STRIPE_SECRET_KEY',
        'NEXT_STRIPE_SECRET_KEY',
    ]);
}

export function getStripeWebhookSecret() {
    return readRequiredEnv('Stripe webhook secret', [
        'STRIPE_WEBHOOK_SECRET',
        'NEXT_STRIPE_WEBHOOK_SECRET',
    ]);
}

export function getSiteUrl() {
    const configuredUrl = readFirstEnv([
        'SITE_URL',
        'URL',
        'DEPLOY_PRIME_URL',
        'NEXT_PUBLIC_DOMAIN',
        'NEXT_PUBLIC_SITE_URL',
    ]);

    if (!configuredUrl) {
        return 'http://localhost:3000';
    }

    return stripTrailingSlash(ensureProtocol(configuredUrl));
}

export type SmtpConfig = {
    host: string,
    port: number,
    secure: boolean,
    username?: string,
    password?: string,
    sender: string,
    senderName: string,
    allowInvalidTls: boolean,
};

export function getSmtpConfig(): SmtpConfig | null {
    const host = readFirstEnv([
        'SMTP_SERVER_HOST',
        'SMTP_HOST',
        'NEXT_SMTP_SERVER_HOST',
    ]);
    const username = readFirstEnv([
        'SMTP_SERVER_USERNAME',
        'SMTP_USERNAME',
        'NEXT_SMTP_SERVER_USERNAME',
    ]);
    const explicitSender = readFirstEnv([
        'SITE_MAIL_SENDER',
        'SMTP_FROM_EMAIL',
        'MAIL_FROM',
        'NEXT_SITE_MAIL_SENDER',
    ]);
    const sender = explicitSender || (username?.includes('@') ? username : undefined);

    if (!host || !sender) {
        return null;
    }

    const port = parseNumber(
        readFirstEnv([
            'SMTP_SERVER_PORT',
            'SMTP_PORT',
            'NEXT_SMTP_SERVER_PORT',
        ]),
        587,
    );

    return {
        host,
        port,
        secure: parseBoolean(
            readFirstEnv([
                'SMTP_SERVER_SECURE',
                'SMTP_SECURE',
                'NEXT_SMTP_SERVER_SECURE',
            ]),
            port === 465,
        ),
        username,
        password: readFirstEnv([
            'SMTP_SERVER_PASSWORD',
            'SMTP_PASSWORD',
            'NEXT_SMTP_SERVER_PASSWORD',
        ]),
        sender,
        senderName: readFirstEnv([
            'SITE_MAIL_SENDER_NAME',
            'SMTP_FROM_NAME',
            'NEXT_SITE_MAIL_SENDER_NAME',
        ]) || 'Darkai Lab',
        allowInvalidTls: parseBoolean(
            readFirstEnv([
                'SMTP_TLS_INSECURE',
                'NEXT_SMTP_TLS_INSECURE',
            ]),
            false,
        ),
    };
}

'use server'
import nodemailer from 'nodemailer';

type SendMailResult = {
    ok: true,
} | {
    ok: false,
    error: string,
};

function readRuntimeEnv(name: string) {
    return process.env[name];
}

function getAttachmentName(image: string) {
    try {
        const pathName = new URL(image).pathname;
        return pathName.split('/').pop() || 'yourConfig.png';
    } catch {
        return 'yourConfig.png';
    }
}

function buildFromAddress(siteMailSender: string | undefined) {
    if (!siteMailSender) {
        return undefined;
    }

    return `"Darkai Lab" <${siteMailSender}>`;
}

export async function sendMail({sendTo, subject, text, html, image}: {sendTo?: string, subject: string, text: string, html?: string, image?: string }): Promise<SendMailResult> {
    try {
        const smtpServerHost = readRuntimeEnv('NEXT_SMTP_SERVER_HOST');
        const smtpServerUsername = readRuntimeEnv('NEXT_SMTP_SERVER_USERNAME');
        const smtpServerPassword = readRuntimeEnv('NEXT_SMTP_SERVER_PASSWORD');
        const siteMailSender = readRuntimeEnv('NEXT_SITE_MAIL_SENDER');
        const smtpServerPort = Number(readRuntimeEnv('NEXT_SMTP_SERVER_PORT') || 587);

        if (!smtpServerHost || !smtpServerUsername || !smtpServerPassword || !siteMailSender) {
            return {
                ok: false,
                error: 'Email service is not configured',
            };
        }

        const transporter = nodemailer.createTransport({
            host: smtpServerHost,
            port: Number.isFinite(smtpServerPort) ? smtpServerPort : 587,
            secure: smtpServerPort === 465,
            auth: {
                user: smtpServerUsername,
                pass: smtpServerPassword,
            },
            tls: {
                rejectUnauthorized: false,
            }
        });

        await transporter.sendMail({
            from: buildFromAddress(siteMailSender),
            to: sendTo,
            subject: subject,
            text: text,
            html: html ? html : '',
            attachments: image
                ? [{
                    filename: getAttachmentName(image),
                    path: image
                }]
                : []
        });

        return {ok: true};
    } catch (error) {
        console.error('Unable to send email', {
            sendTo,
            subject,
            error: error instanceof Error ? error.message : error,
        });

        return {
            ok: false,
            error: 'Unable to send the email right now',
        };
    }
}

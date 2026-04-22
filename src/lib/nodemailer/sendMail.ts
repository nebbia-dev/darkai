'use server'
import nodemailer from 'nodemailer';

const SMTP_SERVER_HOST = process.env.NEXT_SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.NEXT_SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.NEXT_SMTP_SERVER_PASSWORD;
const SITE_MAIL_SENDER = process.env.NEXT_SITE_MAIL_SENDER;
const SMTP_SERVER_PORT = Number(process.env.NEXT_SMTP_SERVER_PORT || 587);

type SendMailResult = {
    ok: true,
} | {
    ok: false,
    error: string,
};

function getAttachmentName(image: string) {
    try {
        const pathName = new URL(image).pathname;
        return pathName.split('/').pop() || 'yourConfig.png';
    } catch {
        return 'yourConfig.png';
    }
}

function buildFromAddress() {
    if (!SITE_MAIL_SENDER) {
        return undefined;
    }

    return `"Darkai Lab" <${SITE_MAIL_SENDER}>`;
}

export async function sendMail({sendTo, subject, text, html, image}: {sendTo?: string, subject: string, text: string, html?: string, image?: string }): Promise<SendMailResult> {
    try {
        if (!SMTP_SERVER_HOST || !SMTP_SERVER_USERNAME || !SMTP_SERVER_PASSWORD || !SITE_MAIL_SENDER) {
            return {
                ok: false,
                error: 'Email service is not configured',
            };
        }

        const transporter = nodemailer.createTransport({
            host: SMTP_SERVER_HOST,
            port: Number.isFinite(SMTP_SERVER_PORT) ? SMTP_SERVER_PORT : 587,
            secure: SMTP_SERVER_PORT === 465,
            auth: {
                user: SMTP_SERVER_USERNAME,
                pass: SMTP_SERVER_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            }
        });

        await transporter.sendMail({
            from: buildFromAddress(),
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

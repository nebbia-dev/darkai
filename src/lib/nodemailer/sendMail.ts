'use server'
import nodemailer from 'nodemailer';
import {getSmtpConfig} from "@/lib/server/runtimeConfig";

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

function buildFromField(senderName: string, sender: string) {
    return `"${senderName.replace(/"/g, '\\"')}" <${sender}>`;
}

export async function sendMail({sendTo, subject, text, html, image}: {sendTo?: string, subject: string, text: string, html?: string, image?: string }): Promise<SendMailResult> {
    try {
        const smtpConfig = getSmtpConfig();

        if (!smtpConfig) {
            return {
                ok: false,
                error: 'Email service is not configured',
            };
        }

        const transporter = nodemailer.createTransport({
            host: smtpConfig.host,
            port: smtpConfig.port,
            secure: smtpConfig.secure,
            auth: smtpConfig.username && smtpConfig.password
                ? {
                    user: smtpConfig.username,
                    pass: smtpConfig.password,
                }
                : undefined,
            tls: {
                rejectUnauthorized: !smtpConfig.allowInvalidTls,
            }
        });

        await transporter.sendMail({
            from: buildFromField(smtpConfig.senderName, smtpConfig.sender),
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

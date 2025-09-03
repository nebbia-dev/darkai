'use server'
import nodemailer from 'nodemailer';
const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
const SITE_MAIL_SENDER = process.env.SITE_MAIL_SENDER;
const transporter = nodemailer.createTransport({
    host: SMTP_SERVER_HOST,
    port: 587,
    secure: false,
    auth: {
        user: SMTP_SERVER_USERNAME,
        pass: SMTP_SERVER_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    }
});

export async function sendMail({sendTo, subject, text, html}: {sendTo?: string; subject: string; text: string; html?: string; }) {
    try {
        const isVerified = await transporter.verify();
        const info = await transporter.sendMail({
            from: `"Darkai Lab" ${SITE_MAIL_SENDER}`,
            to: sendTo,
            subject: subject,
            text: text,
            html: html ? html : '',
        });
        console.log('sent quaso');
    } catch (error) {
        console.error('Something Went Wrong', SMTP_SERVER_USERNAME, SMTP_SERVER_PASSWORD, error);
        return;
    }
}
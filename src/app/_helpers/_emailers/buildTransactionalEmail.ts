const siteUrl = process.env.NEXT_PUBLIC_DOMAIN || 'https://www.darkai-lab.com';

type EmailAction = {
    label: string,
    url: string,
}

type SummaryRow = {
    title: string,
    details?: string[],
    value?: string,
}

type DetailRow = {
    label: string,
    value: string,
}

type EmailLayoutOptions = {
    preheader: string,
    headerLabel?: string,
    title: string,
    intro: string,
    action?: EmailAction,
    secondaryLinkLabel?: string,
    secondaryLinkUrl?: string,
    sections: string[],
    footerNote?: string,
}

export type ConfigEmailSummaryItem = {
    title: string,
    details: string[],
    price: number,
}

export function formatEmailCurrency(value: number) {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(value);
}

export function getEmailSiteUrl() {
    return siteUrl;
}

function escapeHtml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function renderButton(action: EmailAction) {
    return `
        <table role="presentation" style="margin: 0 0 14px 0;">
            <tr>
                <td style="border-radius: 0; background: #111111;">
                    <a href="${escapeHtml(action.url)}" style="display: inline-block; padding: 14px 24px; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 700; letter-spacing: 0.01em;">
                        ${escapeHtml(action.label)}
                    </a>
                </td>
            </tr>
        </table>
    `;
}

export function renderSummarySection(title: string, rows: SummaryRow[], totalLabel?: string, totalValue?: string) {
    return `
        <table role="presentation">
            <tr>
                <td style="padding: 0 0 18px 0; font-size: 22px; line-height: 1.2; font-weight: 700; color: #171717;">
                    ${escapeHtml(title)}
                </td>
            </tr>
            ${rows.map((row, index) => `
                <tr>
                    <td style="padding: ${index === 0 ? '0' : '20px'} 0 20px 0; border-top: ${index === 0 ? '0' : '1px solid #e9e5de'};">
                        <table role="presentation">
                            <tr>
                                <td style="padding: 0 18px 0 0;">
                                    <div style="font-size: 15px; line-height: 1.45; font-weight: 700; color: #171717;">
                                        ${escapeHtml(row.title)}
                                    </div>
                                    ${(row.details ?? []).map((detail) => `
                                        <div style="font-size: 13px; line-height: 1.5; color: #6b675f; padding-top: 6px;">
                                            ${escapeHtml(detail)}
                                        </div>
                                    `).join('')}
                                </td>
                                <td style="white-space: nowrap; font-size: 15px; line-height: 1.45; font-weight: 700; color: #171717;">
                                    ${row.value ? escapeHtml(row.value) : ''}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            `).join('')}
            ${totalLabel && totalValue
                ? `
                    <tr>
                        <td style="padding: 20px 0 0 0; border-top: 1px solid #d8d1c6;">
                            <table role="presentation">
                                <tr>
                                    <td style="font-size: 14px; line-height: 1.4; color: #6b675f;">
                                        ${escapeHtml(totalLabel)}
                                    </td>
                                    <td style="font-size: 28px; line-height: 1.1; font-weight: 700; color: #171717;">
                                        ${escapeHtml(totalValue)}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                `
                : ''}
        </table>
    `;
}

export function renderDetailsSection(title: string, rows: DetailRow[]) {
    return `
        <table role="presentation">
            <tr>
                <td style="padding: 0 0 18px 0; font-size: 22px; line-height: 1.2; font-weight: 700; color: #171717;">
                    ${escapeHtml(title)}
                </td>
            </tr>
            ${rows.map((row, index) => `
                <tr>
                    <td style="padding: ${index === 0 ? '0' : '14px'} 0 14px 0; border-top: ${index === 0 ? '0' : '1px solid #e9e5de'};">
                        <table role="presentation">
                            <tr>
                                <td style="padding: 0 18px 0 0; font-size: 13px; line-height: 1.5; text-transform: uppercase; letter-spacing: 0.08em; color: #8a857c;">
                                    ${escapeHtml(row.label)}
                                </td>
                                <td style="font-size: 15px; line-height: 1.45; font-weight: 700; color: #171717;">
                                    ${escapeHtml(row.value)}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            `).join('')}
        </table>
    `;
}

export function renderImageSection(title: string, imageUrl: string) {
    return `
        <table role="presentation">
            <tr>
                <td style="padding: 0 0 18px 0; font-size: 22px; line-height: 1.2; font-weight: 700; color: #171717;">
                    ${escapeHtml(title)}
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid #e9e5de; background: #faf8f4; padding: 18px;">
                    <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(title)}" style="display: block; width: 100%; height: auto; border: 0;" />
                </td>
            </tr>
        </table>
    `;
}

export function renderTransactionalEmail({
    preheader,
    headerLabel,
    title,
    intro,
    action,
    secondaryLinkLabel,
    secondaryLinkUrl,
    sections,
    footerNote,
}: EmailLayoutOptions) {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>${escapeHtml(title)}</title>
            </head>
            <body style="margin: 0; padding: 0; background: #f4efe8; font-family: Arial, Helvetica, sans-serif; color: #171717;">
                <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; mso-hide: all;">
                    ${escapeHtml(preheader)}
                </div>
                <table role="presentation" style="background: #f4efe8;">
                    <tr>
                        <td style="padding: 24px 12px;">
                            <table role="presentation" style="max-width: 640px; background: #ffffff; border: 1px solid #e7e0d7;">
                                <tr>
                                    <td style="padding: 34px 32px 20px 32px;">
                                        <table role="presentation">
                                            <tr>
                                                <td style="font-size: 34px; line-height: 1; font-weight: 800; letter-spacing: -0.04em; color: #111111;">
                                                    DARKAI
                                                </td>
                                                <td style="font-size: 13px; line-height: 1.4; font-weight: 700; letter-spacing: 0.06em; color: #b2aba1; text-transform: uppercase;">
                                                    ${headerLabel ? escapeHtml(headerLabel) : ''}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 0 32px 18px 32px;">
                                        <h1 style="margin: 0 0 12px 0; font-size: 34px; line-height: 1.08; font-weight: 700; letter-spacing: -0.03em; color: #171717;">
                                            ${escapeHtml(title)}
                                        </h1>
                                        <p style="margin: 0; font-size: 16px; line-height: 1.65; color: #5f5a53;">
                                            ${escapeHtml(intro)}
                                        </p>
                                    </td>
                                </tr>
                                ${(action || (secondaryLinkLabel && secondaryLinkUrl))
                                    ? `
                                        <tr>
                                            <td style="padding: 0 32px 30px 32px;">
                                                ${action ? renderButton(action) : ''}
                                                ${secondaryLinkLabel && secondaryLinkUrl
                                                    ? `
                                                        <div style="font-size: 13px; line-height: 1.5; color: #5f5a53;">
                                                            or <a href="${escapeHtml(secondaryLinkUrl)}" style="color: #171717; text-decoration: underline;">${escapeHtml(secondaryLinkLabel)}</a>
                                                        </div>
                                                    `
                                                    : ''}
                                            </td>
                                        </tr>
                                    `
                                    : ''}
                                ${sections.map((section) => `
                                    <tr>
                                        <td style="padding: 0 32px 28px 32px;">
                                            ${section}
                                        </td>
                                    </tr>
                                `).join('')}
                                <tr>
                                    <td style="padding: 4px 32px 32px 32px;">
                                        <div style="font-size: 12px; line-height: 1.7; color: #7a746c; border-top: 1px solid #e7e0d7; padding-top: 18px;">
                                            ${escapeHtml(footerNote || 'If you need support, contact us at support@darkai-lab.com.')}
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    `;
}

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
        <table role="presentation" class="w-full border-collapse">
            <tr>
                <td class="pb-3">
                    <a
                        href="${escapeHtml(action.url)}"
                        class="inline-block bg-ink px-6 py-3 text-button font-semibold text-white no-underline"
                        style="display: inline-block; background: #111111; color: #ffffff; text-decoration: none;"
                    >
                        ${escapeHtml(action.label)}
                    </a>
                </td>
            </tr>
        </table>
    `;
}

export function renderSummarySection(title: string, rows: SummaryRow[], totalLabel?: string, totalValue?: string) {
    return `
        <table role="presentation" class="w-full border-collapse table-fixed">
            <tr>
                <td class="pb-4 text-section-title font-bold text-ink">
                    ${escapeHtml(title)}
                </td>
            </tr>
            ${rows.map((row, index) => `
                <tr>
                    <td class="${index === 0 ? 'pb-5' : 'border-top-soft py-5'}">
                        <table role="presentation" class="w-full border-collapse table-fixed">
                            <tr>
                                <td class="align-top pr-4">
                                    <div class="text-body font-bold text-ink">
                                        ${escapeHtml(row.title)}
                                    </div>
                                    ${(row.details ?? []).map((detail) => `
                                        <div class="pt-1 text-detail text-muted">
                                            ${escapeHtml(detail)}
                                        </div>
                                    `).join('')}
                                </td>
                                <td class="align-top text-right whitespace-nowrap text-body font-bold text-ink">
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
                        <td class="border-top-strong pt-5">
                            <table role="presentation" class="w-full border-collapse table-fixed">
                                <tr>
                                    <td class="text-label text-muted">
                                        ${escapeHtml(totalLabel)}
                                    </td>
                                    <td class="text-right text-total font-bold text-ink">
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
        <table role="presentation" class="w-full border-collapse table-fixed">
            <tr>
                <td class="pb-4 text-section-title font-bold text-ink">
                    ${escapeHtml(title)}
                </td>
            </tr>
            ${rows.map((row, index) => `
                <tr>
                    <td class="${index === 0 ? 'pb-4' : 'border-top-soft py-4'}">
                        <table role="presentation" class="w-full border-collapse table-fixed">
                            <tr>
                                <td class="align-top pr-4 text-overline text-subtle uppercase tracking-wide">
                                    ${escapeHtml(row.label)}
                                </td>
                                <td class="align-top text-right text-body font-bold text-ink">
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
        <table role="presentation" class="w-full border-collapse">
            <tr>
                <td class="pb-4 text-section-title font-bold text-ink">
                    ${escapeHtml(title)}
                </td>
            </tr>
            <tr>
                <td class="border-soft bg-soft p-4">
                    <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(title)}" class="block w-full h-auto border-0" />
                </td>
            </tr>
        </table>
    `;
}

function renderEmailStyles() {
    return `
        <style>
            body {
                margin: 0;
                padding: 0;
                background: #f4efe8;
                font-family: Arial, Helvetica, sans-serif;
                color: #171717;
            }
            table {
                border-collapse: collapse;
                border-spacing: 0;
            }
            img {
                max-width: 100%;
            }
            .hidden-preheader {
                display: none;
                max-height: 0;
                overflow: hidden;
                opacity: 0;
                mso-hide: all;
            }
            .w-full {
                width: 100%;
            }
            .mx-auto {
                margin-left: auto;
                margin-right: auto;
            }
            .max-w-email {
                max-width: 640px;
            }
            .bg-canvas {
                background: #f4efe8;
            }
            .bg-white {
                background: #ffffff;
            }
            .bg-soft {
                background: #faf8f4;
            }
            .bg-ink {
                background: #111111;
            }
            .text-white {
                color: #ffffff;
            }
            .text-ink {
                color: #171717;
            }
            .text-muted {
                color: #6b675f;
            }
            .text-subtle {
                color: #8a857c;
            }
            .text-label {
                font-size: 14px;
                line-height: 1.4;
            }
            .text-button {
                font-size: 14px;
                line-height: 1;
                letter-spacing: 0.01em;
            }
            .text-body {
                font-size: 15px;
                line-height: 1.45;
            }
            .text-detail {
                font-size: 13px;
                line-height: 1.5;
            }
            .text-overline {
                font-size: 13px;
                line-height: 1.5;
            }
            .text-meta {
                font-size: 13px;
                line-height: 1.4;
                letter-spacing: 0.06em;
            }
            .text-section-title {
                font-size: 22px;
                line-height: 1.2;
            }
            .text-title {
                font-size: 34px;
                line-height: 1.08;
                letter-spacing: -0.03em;
            }
            .text-intro {
                font-size: 16px;
                line-height: 1.65;
            }
            .text-total {
                font-size: 28px;
                line-height: 1.1;
            }
            .text-brand {
                font-size: 34px;
                line-height: 1;
                letter-spacing: -0.04em;
            }
            .font-bold {
                font-weight: 700;
            }
            .font-semibold {
                font-weight: 700;
            }
            .font-black {
                font-weight: 800;
            }
            .uppercase {
                text-transform: uppercase;
            }
            .tracking-wide {
                letter-spacing: 0.08em;
            }
            .text-right {
                text-align: right;
            }
            .no-underline {
                text-decoration: none;
            }
            .inline-block {
                display: inline-block;
            }
            .block {
                display: block;
            }
            .h-auto {
                height: auto;
            }
            .border-0 {
                border: 0;
            }
            .align-top {
                vertical-align: top;
            }
            .whitespace-nowrap {
                white-space: nowrap;
            }
            .shell {
                padding: 24px 12px;
            }
            .px-8 {
                padding-left: 32px;
                padding-right: 32px;
            }
            .pt-8 {
                padding-top: 32px;
            }
            .pb-5 {
                padding-bottom: 20px;
            }
            .pb-4 {
                padding-bottom: 18px;
            }
            .pb-3 {
                padding-bottom: 14px;
            }
            .pb-7 {
                padding-bottom: 30px;
            }
            .pb-8 {
                padding-bottom: 32px;
            }
            .pt-5 {
                padding-top: 20px;
            }
            .pt-4 {
                padding-top: 18px;
            }
            .pt-1 {
                padding-top: 6px;
            }
            .py-5 {
                padding-top: 20px;
                padding-bottom: 20px;
            }
            .py-4 {
                padding-top: 14px;
                padding-bottom: 14px;
            }
            .py-3 {
                padding-top: 14px;
                padding-bottom: 14px;
            }
            .px-6 {
                padding-left: 24px;
                padding-right: 24px;
            }
            .pr-4 {
                padding-right: 18px;
            }
            .p-4 {
                padding: 18px;
            }
            .border-shell {
                border: 1px solid #e7e0d7;
            }
            .border-soft {
                border: 1px solid #e9e5de;
            }
            .border-top-soft {
                border-top: 1px solid #e9e5de;
            }
            .border-top-strong {
                border-top: 1px solid #d8d1c6;
            }
            .footer {
                font-size: 12px;
                line-height: 1.7;
                color: #7a746c;
            }
            @media screen and (max-width: 640px) {
                .shell {
                    padding: 16px 10px;
                }
                .px-8 {
                    padding-left: 22px;
                    padding-right: 22px;
                }
                .text-title {
                    font-size: 28px;
                }
                .text-brand {
                    font-size: 28px;
                }
                .text-total {
                    font-size: 24px;
                }
            }
        </style>
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
                ${renderEmailStyles()}
            </head>
            <body class="bg-canvas">
                <div class="hidden-preheader">
                    ${escapeHtml(preheader)}
                </div>
                <div class="bg-canvas shell">
                    <div class="mx-auto max-w-email">
                        <table role="presentation" class="w-full bg-white border-shell">
                            <tr>
                                <td class="px-8 pt-8 pb-5">
                                    <table role="presentation" class="w-full border-collapse table-fixed">
                                        <tr>
                                            <td class="text-brand font-black text-ink">
                                                DARKAI
                                            </td>
                                            <td class="text-right text-meta font-semibold text-subtle uppercase">
                                                ${headerLabel ? escapeHtml(headerLabel) : ''}
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td class="px-8 pb-4">
                                    <h1 class="text-title font-bold text-ink" style="margin: 0 0 12px 0;">
                                        ${escapeHtml(title)}
                                    </h1>
                                    <p class="text-intro text-muted" style="margin: 0;">
                                        ${escapeHtml(intro)}
                                    </p>
                                </td>
                            </tr>
                            ${(action || (secondaryLinkLabel && secondaryLinkUrl))
                                ? `
                                    <tr>
                                        <td class="px-8 pb-7">
                                            ${action ? renderButton(action) : ''}
                                            ${secondaryLinkLabel && secondaryLinkUrl
                                                ? `
                                                    <div class="text-detail text-muted">
                                                        or <a href="${escapeHtml(secondaryLinkUrl)}" class="text-ink" style="color: #171717; text-decoration: underline;">${escapeHtml(secondaryLinkLabel)}</a>
                                                    </div>
                                                `
                                                : ''}
                                        </td>
                                    </tr>
                                `
                                : ''}
                            ${sections.map((section) => `
                                <tr>
                                    <td class="px-8" style="padding-bottom: 28px;">
                                        ${section}
                                    </td>
                                </tr>
                            `).join('')}
                            <tr>
                                <td class="px-8 pb-8" style="padding-top: 4px;">
                                    <div class="footer border-top-soft pt-4">
                                        ${escapeHtml(footerNote || 'If you need support, contact us at support@darkai-lab.com.')}
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </body>
        </html>
    `;
}

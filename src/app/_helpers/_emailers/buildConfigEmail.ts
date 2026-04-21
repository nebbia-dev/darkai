import {History, Packaging, Prices} from "@/app/_types/TeethOptions";
import {buildConfigSummaryItems} from "@/app/_helpers/_string-modders/generateConfigHtml";
import {
    formatEmailCurrency,
    getEmailSiteUrl,
    renderImageSection,
    renderSummarySection,
    renderTransactionalEmail,
} from "@/app/_helpers/_emailers/buildTransactionalEmail";

type BuildConfigEmailOptions = {
    recipientName?: string,
    teethPrices: Prices,
    history: History[][],
    currentStep: number,
    packaging?: Packaging,
    total: number,
    imageUrl?: string,
}

export function buildConfigEmail({
    recipientName,
    teethPrices,
    history,
    currentStep,
    packaging,
    total,
    imageUrl,
}: BuildConfigEmailOptions) {
    const siteUrl = getEmailSiteUrl();
    const summaryItems = buildConfigSummaryItems(teethPrices, history, currentStep, packaging).map((item) => ({
        title: item.title,
        details: item.details,
        value: formatEmailCurrency(item.price),
    }));
    const intro = recipientName?.trim().length
        ? `Hi ${recipientName.trim()}, here is the recap of the configuration you saved on DARKAI. We kept the details below so you can review everything before moving forward with your order.`
        : `Here is the recap of the configuration you saved on DARKAI. We kept the details below so you can review everything before moving forward with your order.`;

    const sections = [
        ...(imageUrl ? [renderImageSection('Saved preview', imageUrl)] : []),
        renderSummarySection('Configuration summary', summaryItems, 'Total', formatEmailCurrency(total)),
    ];

    const html = renderTransactionalEmail({
        preheader: 'Your DARKAI configuration recap is ready.',
        headerLabel: 'Configuration recap',
        title: 'Your configuration is ready',
        intro,
        action: {
            label: 'Visit our store',
            url: siteUrl,
        },
        secondaryLinkLabel: 'Contact support',
        secondaryLinkUrl: 'mailto:support@darkai-lab.com',
        sections,
        footerNote: 'Need a hand before checkout? Write to support@darkai-lab.com and our team will help you refine your configuration.',
    });

    const text = [
        'DARKAI',
        'Your configuration is ready.',
        intro,
        '',
        'Configuration summary:',
        ...summaryItems.flatMap((item) => [
            `- ${item.title}: ${item.value}`,
            ...item.details.map((detail) => `  ${detail}`),
        ]),
        '',
        `Total: ${formatEmailCurrency(total)}`,
        `Visit our store: ${siteUrl}`,
    ].join('\n');

    return {html, text};
}

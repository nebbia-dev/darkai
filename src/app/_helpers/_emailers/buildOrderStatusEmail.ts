import orderIdConverter from "@/app/_helpers/_converters/orderIdConverter";
import OrderInfo from "@/app/_types/OrderInfo";
import {
    formatEmailCurrency,
    getEmailSiteUrl,
    renderDetailsSection,
    renderTransactionalEmail,
} from "@/app/_helpers/_emailers/buildTransactionalEmail";

type BuildOrderStatusEmailOptions = {
    customerName?: string,
    orderId: number,
    status: Exclude<OrderInfo["status"], undefined>,
    total?: number,
}

function getStatusCopy(status: Exclude<OrderInfo["status"], undefined>) {
    switch (status) {
        case 'In production':
            return {
                title: 'Your order is in production',
                intro: 'Our team is now crafting your custom order. We will send you another update as soon as it is ready to leave the studio.',
            };
        case 'Shipped':
            return {
                title: 'Your order has been shipped',
                intro: 'Good news: your order is on its way. Keep an eye on your inbox for any additional shipping details from our team.',
            };
        case 'Delivered':
            return {
                title: 'Your order has been delivered',
                intro: 'Your order has reached its destination. We hope you love it, and we are here if you need anything after delivery.',
            };
        case 'Canceled':
            return {
                title: 'Your order has been canceled',
                intro: 'This order has been canceled. If you have any questions or if you would like help placing a new order, our team is available for support.',
            };
        case 'New':
            return {
                title: 'Your order has been confirmed',
                intro: 'We have received your order and our team is getting everything ready for the next steps.',
            };
        default:
            return {
                title: 'Your order has been updated',
                intro: 'We have posted a new update to your DARKAI order.',
            };
    }
}

export function buildOrderStatusEmail({
    customerName,
    orderId,
    status,
    total,
}: BuildOrderStatusEmailOptions) {
    const siteUrl = getEmailSiteUrl();
    const orderCode = orderIdConverter(orderId);
    const copy = getStatusCopy(status);
    const intro = customerName?.trim().length
        ? `Hi ${customerName.trim()}, ${copy.intro}`
        : copy.intro;
    const detailRows = [
        {label: 'Order', value: orderCode},
        {label: 'Current status', value: status},
        ...(typeof total === 'number' ? [{label: 'Order total', value: formatEmailCurrency(total)}] : []),
    ];

    const html = renderTransactionalEmail({
        preheader: `Your DARKAI order ${orderCode} is now ${status}.`,
        headerLabel: `Order ${orderCode}`,
        title: copy.title,
        intro,
        action: {
            label: 'Visit our store',
            url: siteUrl,
        },
        secondaryLinkLabel: 'Contact support',
        secondaryLinkUrl: 'mailto:support@darkai-lab.com',
        sections: [
            renderDetailsSection('Order details', detailRows),
        ],
        footerNote: 'If you need help with your order, contact support@darkai-lab.com and we will get back to you as soon as possible.',
    });

    const text = [
        'DARKAI',
        copy.title,
        intro,
        '',
        `Order: ${orderCode}`,
        `Current status: ${status}`,
        ...(typeof total === 'number' ? [`Order total: ${formatEmailCurrency(total)}`] : []),
        '',
        `Visit our store: ${siteUrl}`,
    ].join('\n');

    return {
        subject: `DARKAI order ${orderCode}: ${status}`,
        html,
        text,
    };
}

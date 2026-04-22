'use server'
import createConfig from "@/app/_helpers/_db-interactions/createConfig";
import createCustomer from "@/app/_helpers/_db-interactions/createCustomer";
import createOrder from "@/app/_helpers/_db-interactions/createOrder";
import findShippingFees from "@/app/_helpers/_checkers/findShippingFees";
import updateConfigScreen from "@/app/_helpers/_db-interactions/updateConfigScreen";
import {generateConfigReceiptDescription} from "@/app/_helpers/_string-modders/generateConfigHtml";
import PersonalData from "@/app/_types/PersonalData";
import {History, Packaging} from "@/app/_types/TeethOptions";
import {getStripe} from "@/app/_helpers/_stripe/stripe";

type PrepareCheckoutInput = {
    billingData: PersonalData,
    shippingData: PersonalData,
    differentShipOpts: boolean,
    currentConfig: History | undefined,
    total: number,
    packaging: Packaging|undefined,
    uploadedConfigPath: string | undefined,
    uploadedScanPath: string | undefined,
    savedConfig: number | undefined,
}

type PrepareCheckoutResult = {
    ok: true,
    clientSecret: string,
    sessionId: string,
    orderId: number,
    configId: number,
    finalTotal: number,
}

type PrepareCheckoutErrorResult = {
    ok: false,
    error: string,
}

const klarnaEligibleEurCountries = new Map([
    ['Austria', 10000],
    ['Belgium', 10000],
    ['Finland', 10000],
    ['France', 4000],
    ['Germany', 10000],
    ['Greece', 4000],
    ['Ireland', 4000],
    ['Italy', 4000],
    ['Netherlands', 5000],
    ['Portugal', 4000],
    ['Spain', 10000],
]);

function isPersonalDataComplete(data: PersonalData, needsEmail: boolean) {
    return !(
        data.name === ''
        || data.lastname === ''
        || data.address === ''
        || data.city === ''
        || data.state === ''
        || data.phone === ''
        || data.postalCode === ''
        || (needsEmail && !data.email)
    );
}

function toCheckoutErrorMessage(error: unknown) {
    if (error instanceof Error && error.message.trim().length > 0) {
        return error.message;
    }

    return 'Unable to initialize the payment';
}

function getPaymentMethodTypes(country: string, total: number): Array<'card' | 'klarna'> {
    const paymentMethodTypes: Array<'card' | 'klarna'> = ['card'];
    const klarnaMaxAmount = klarnaEligibleEurCountries.get(country);

    if (klarnaMaxAmount && total > 0 && total <= klarnaMaxAmount) {
        paymentMethodTypes.push('klarna');
    }

    return paymentMethodTypes;
}

function buildReceiptDescription(receiptDescription: string | undefined) {
    if (!receiptDescription) {
        return undefined;
    }

    return receiptDescription.length > 1000
        ? `${receiptDescription.slice(0, 997)}...`
        : receiptDescription;
}

export async function prepareCheckout({
    billingData,
    shippingData,
    differentShipOpts,
    currentConfig,
    total,
    packaging,
    uploadedConfigPath,
    uploadedScanPath,
    savedConfig,
}: PrepareCheckoutInput): Promise<PrepareCheckoutResult | PrepareCheckoutErrorResult> {
    try {
        if (!isPersonalDataComplete(billingData, true)) {
            throw new Error('The billing information is incomplete');
        }

        if (differentShipOpts && !isPersonalDataComplete(shippingData, false)) {
            throw new Error('The shipping information is incomplete');
        }

        const shippingAddress = differentShipOpts ? shippingData : {...billingData, email: undefined};
        const shippingCountry = shippingAddress.state;
        const shippingFees = findShippingFees(shippingCountry);

        if (shippingFees === null) {
            throw new Error('Unfortunately we do not ship to this country');
        }

        if (!savedConfig && !currentConfig) {
            throw new Error('No configuration found to associate with this checkout');
        }

        const customer = await createCustomer(billingData, uploadedScanPath);
        if (!customer?.[0]?.id) {
            throw new Error('Unable to create the customer record');
        }

        const customerId = customer[0].id;
        let configId = savedConfig;

        if (!configId) {
            const config = await createConfig(currentConfig as History, total, packaging, 'Not completed');

            if (!config?.[0]?.id) {
                throw new Error('Unable to create the configuration record');
            }

            const newConfigId = config[0].id;
            configId = newConfigId;
        }

        if (!configId) {
            throw new Error('Unable to determine the configuration record');
        }

        if (uploadedConfigPath) {
            await updateConfigScreen(configId, uploadedConfigPath);
        }

        const receiptDescription = currentConfig
            ? buildReceiptDescription(generateConfigReceiptDescription(currentConfig.prices, [[currentConfig]], 0, packaging))
            : undefined;
        const finalConfigId = configId;
        const finalTotal = total + shippingFees;
        const order = await createOrder(customerId, finalConfigId, finalTotal, shippingAddress, 'Pending payment');

        if (!order?.[0]?.id) {
            throw new Error('Unable to create the order record');
        }

        const domainURL = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";
        const returnUrl = `${domainURL}/checkout/payment/return?session_id={CHECKOUT_SESSION_ID}`;
        const paymentMethodTypes = getPaymentMethodTypes(shippingCountry, finalTotal);

        const session = await getStripe().checkout.sessions.create({
            ui_mode: "embedded_page",
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        unit_amount: Math.round(finalTotal * 100),
                        product_data: {
                            name: 'Your Darkai order',
                        },
                    },
                    quantity: 1,
                }
            ],
            mode: "payment",
            payment_method_types: paymentMethodTypes,
            customer_email: billingData.email,
            payment_intent_data: {
                description: receiptDescription,
                receipt_email: billingData.email,
            },
            client_reference_id: String(order[0].id),
            metadata: {
                orderId: String(order[0].id),
                configId: String(finalConfigId),
                customerId: String(customerId),
            },
            return_url: returnUrl,
        });

        if (!session.client_secret) {
            throw new Error('Error initiating Stripe session');
        }

        return {
            ok: true,
            clientSecret: session.client_secret,
            sessionId: session.id,
            orderId: order[0].id,
            configId: finalConfigId,
            finalTotal,
        };
    } catch (error) {
        console.error('Unable to prepare checkout', error);

        return {
            ok: false,
            error: toCheckoutErrorMessage(error),
        };
    }
}

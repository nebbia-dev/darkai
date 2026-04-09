'use server'
import createConfig from "@/app/_helpers/_db-interactions/createConfig";
import createCustomer from "@/app/_helpers/_db-interactions/createCustomer";
import createOrder from "@/app/_helpers/_db-interactions/createOrder";
import findShippingFees from "@/app/_helpers/_checkers/findShippingFees";
import uploadConfig from "@/app/_helpers/_db-interactions/uploadConfig";
import PersonalData from "@/app/_types/PersonalData";
import {History, Packaging} from "@/app/_types/TeethOptions";
import {stripe} from "@/app/_stripe/stripe";

type PrepareCheckoutInput = {
    billingData: PersonalData,
    shippingData: PersonalData,
    differentShipOpts: boolean,
    currentConfig: History | undefined,
    total: number,
    packaging: Packaging,
    bufferConfigImage: string | undefined,
    uploadedScanPath: string | undefined,
    savedConfig: number | undefined,
}

type PrepareCheckoutResult = {
    clientSecret: string,
    sessionId: string,
    orderId: number,
    configId: number,
    finalTotal: number,
}

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

export async function prepareCheckout({
    billingData,
    shippingData,
    differentShipOpts,
    currentConfig,
    total,
    packaging,
    bufferConfigImage,
    uploadedScanPath,
    savedConfig,
}: PrepareCheckoutInput): Promise<PrepareCheckoutResult> {
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
    const number = Math.random() * 100 + Math.cos(Math.random() * 100);

    let configId = savedConfig;

    if (!configId) {
        const config = await createConfig(currentConfig as History, total, packaging, 'Not completed');

        if (!config?.[0]?.id) {
            throw new Error('Unable to create the configuration record');
        }

        const newConfigId = config[0].id;
        configId = newConfigId;

        if (bufferConfigImage) {
            await uploadConfig(bufferConfigImage, number, newConfigId);
        }
    }

    if (!configId) {
        throw new Error('Unable to determine the configuration record');
    }

    const finalConfigId = configId;
    const finalTotal = total + shippingFees;
    const order = await createOrder(customerId, finalConfigId, finalTotal, shippingAddress, 'Pending payment');

    if (!order?.[0]?.id) {
        throw new Error('Unable to create the order record');
    }

    const domainURL = process.env.DOMAIN || "http://localhost:3000";
    const returnUrl = `${domainURL}/checkout/payment/return?session_id={CHECKOUT_SESSION_ID}`;

    const session = await stripe.checkout.sessions.create({
        ui_mode: "embedded_page",
        line_items: [
            {
                price_data: {
                    currency: 'eur',
                    unit_amount: Math.round(finalTotal * 100),
                    product_data: {
                        name: 'Darkai order',
                    },
                },
                quantity: 1,
            }
        ],
        mode: "payment",
        payment_method_types: ['card'],
        customer_email: billingData.email,
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
        clientSecret: session.client_secret,
        sessionId: session.id,
        orderId: order[0].id,
        configId: finalConfigId,
        finalTotal,
    };
}

import Stripe from "stripe";

export function isCheckoutSessionPaymentConfirmed(session: Stripe.Checkout.Session) {
    return session.payment_status === 'paid' || session.payment_status === 'no_payment_required';
}

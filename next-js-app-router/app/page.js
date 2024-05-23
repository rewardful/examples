'use client'

import Script from 'next/script'

// Use your own Stripe Publishable Key (THIS IS NOT A STRIPE API KEY!!)
const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_APP_STRIPE_PUBLISHABLE_KEY

// Use your own Stripe ID
const STRIPE_PRICE_ID = process.env.NEXT_PUBLIC_APP_PRICE_ID

export default function PreviewPage() {
    const onClick = (e) => {
        e.preventDefault()
        const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);

        stripe.redirectToCheckout({
            lineItems: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
            mode: 'payment',
            successUrl: `${window.location.origin}?result=success`,
            cancelUrl: `${window.location.origin}?result=canceled`,
            clientReferenceId: Rewardful.referral
        })
    }

    return (
        <>
            <form onClick={onClick}>
                <section>
                    <button type="submit" role="link">
                        Checkout
                    </button>
                </section>
                <style jsx>
                    {`
                      section {
                        background: #ffffff;
                        display: flex;
                        flex-direction: column;
                        width: 400px;
                        height: 112px;
                        border-radius: 6px;
                        justify-content: space-between;
                      }

                      button {
                        height: 36px;
                        background: #556cd6;
                        border-radius: 4px;
                        color: white;
                        border: 0;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
                      }

                      button:hover {
                        opacity: 0.8;
                      }
                    `}
                </style>
            </form>
            <Script src="https://js.stripe.com/v3"></Script>
        </>
    );
}
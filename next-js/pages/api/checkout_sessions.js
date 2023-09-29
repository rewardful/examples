const { REWARDFUL_DEMO_STRIPE_PAYMENT_PRICE_ID, REWARDFUL_DEMO_STRIPE_API_KEY } = process.env
// Use your own Stripe API Key
const stripe = require('stripe')(REWARDFUL_DEMO_STRIPE_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    console.log(req.body)
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: REWARDFUL_DEMO_STRIPE_PAYMENT_PRICE_ID,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`, // Use your own success URL
        cancel_url: `${req.headers.origin}/?canceled=true`, // Use your own cancel URL
        ...(req.body.referral ? { client_reference_id: req.body.referral } : null),
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
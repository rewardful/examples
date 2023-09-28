// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const { REWARDFUL_DEMO_STRIPE_PAYMENT_PRICE_ID, REWARDFUL_DEMO_STRIPE_API_KEY } = process.env
const stripe = require('stripe')(REWARDFUL_DEMO_STRIPE_API_KEY);
const express = require('express');
const app = express();
const bodyParser = require("body-parser")

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const url  = `${req.get('x-forwarded-proto')}://${req.get('x-forwarded-host')}`
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: REWARDFUL_DEMO_STRIPE_PAYMENT_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${url}?success=true`,
    cancel_url: `${url}?canceled=true`,
    ...(req.body.referral ? { client_reference_id: req.body.referral } : null)
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));
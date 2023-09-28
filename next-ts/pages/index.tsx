import React, {useState} from 'react';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

export default function PreviewPage() {
  const [referral, setReferral] = useState(null)

  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    (window as any).rewardful('ready', function() {
      setReferral((window as any).Rewardful.referral)
    });
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  return (
      <form action="/api/checkout_sessions" method="POST">
        <div>Referral:  { referral || 'none' }</div>
        <section>
          { referral ? <input type="hidden" name="referral" value={referral} /> : null }
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
  );
}
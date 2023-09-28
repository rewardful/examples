import React, { useState, useEffect } from "react";
import "./App.css";

const ProductDisplay = () => {
  const [referral, setReferral] = useState(null);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    window.addEventListener('Rewardful.initialized', function () {
      setReferral(window.Rewardful.referral)
    })
  }, []);

  return <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
      <h3>Stubborn Attachments</h3>
      <h5>$20.00</h5>
      <h3>
        Referral: { referral || 'none'}
      </h3>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      { referral ? <input type="hidden" value={referral} name="referral" /> : null }
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>
};

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}
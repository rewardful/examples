# Accept a Payment with Stripe Checkout

Stripe Checkout is the fastest way to get started with payments. Included are some basic build and run scripts you can use to start up the application.

## Running the sample

### Development

1. Build the application
~~~shell
$ npm install
~~~

2. _Optional_: download and run the [Stripe CLI](https://stripe.com/docs/stripe-cli)
~~~shell
$ stripe listen --forward-to localhost:3000/api/webhooks
~~~

3. Run the application
~~~shell
$ STRIPE_WEBHOOK_SECRET=$(stripe listen --print-secret) npm run dev
~~~

4. Go to [localhost:3000](http://localhost:3000)

### Production

1. Build the application
~~~shell
$ npm install

$ npm build
~~~

2. Run the application
~~~shell
$ npm start
~~~
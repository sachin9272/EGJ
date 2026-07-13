import Stripe from 'stripe';
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_API_SECRET);

async function createSession() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: 'sachinsingh9272@gmail.com',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Ayahuasca Experience',
            },
            unit_amount: 11000,
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5173/success`,
      cancel_url: `http://localhost:5173/`,
      metadata: {
        bookingId: 'test_booking_id_' + Date.now(), // Fake booking ID for testing webhook
      }
    });
    console.log("Stripe Checkout URL:", session.url);
  } catch(e) {
    console.error(e);
  }
}
createSession();

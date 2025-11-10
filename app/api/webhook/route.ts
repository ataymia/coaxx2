import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  try {
    // Get the raw body as text
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    // In production with Cloudflare Workers:
    // const stripe = new Stripe(env.STRIPE_SECRET_KEY);
    // const event = stripe.webhooks.constructEvent(
    //   body,
    //   signature,
    //   env.STRIPE_WEBHOOK_SECRET
    // );

    // switch (event.type) {
    //   case 'checkout.session.completed': {
    //     const session = event.data.object as Stripe.Checkout.Session;
    //     
    //     // Get line items
    //     const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    //     
    //     // Decrement stock in D1 database
    //     for (const item of lineItems.data) {
    //       const productId = item.price?.product as string;
    //       await decrementStock(env.DB, productId, item.quantity || 1);
    //     }
    //     
    //     // Create order in database
    //     await createOrder(env.DB, {
    //       stripe_session_id: session.id,
    //       stripe_payment_intent: session.payment_intent as string,
    //       customer_email: session.customer_email || '',
    //       customer_name: session.metadata?.customer_name,
    //       total: session.amount_total! / 100,
    //       status: 'paid',
    //     }, lineItems.data.map(item => ({
    //       product_id: item.price?.product as string,
    //       product_name: item.description || '',
    //       quantity: item.quantity || 1,
    //       price: item.price?.unit_amount! / 100,
    //     })));
    //     
    //     // Send email receipt (integrate with email service)
    //     // await sendEmailReceipt(session.customer_email, orderDetails);
    //     
    //     break;
    //   }
    //   case 'payment_intent.payment_failed': {
    //     const paymentIntent = event.data.object;
    //     console.error('Payment failed:', paymentIntent.id);
    //     break;
    //   }
    // }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

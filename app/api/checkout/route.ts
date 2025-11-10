import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// This would normally get STRIPE_SECRET_KEY from environment
// For demo purposes, we'll return a mock response
export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { items: any[], customer: any };
    const { items, customer } = body;

    // In production, this would create a real Stripe checkout session
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    //   apiVersion: '2024-11-20.acacia',
    // });

    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: items.map((item: any) => ({
    //     price_data: {
    //       currency: 'usd',
    //       product_data: {
    //         name: item.product_name,
    //       },
    //       unit_amount: Math.round(item.price * 100),
    //     },
    //     quantity: item.quantity,
    //   })),
    //   mode: 'payment',
    //   success_url: `${request.headers.get('origin')}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${request.headers.get('origin')}/shop/cart`,
    //   customer_email: customer.email,
    //   metadata: {
    //     customer_name: customer.name,
    //     customer_address: customer.address,
    //     customer_city: customer.city,
    //     customer_state: customer.state,
    //     customer_zip: customer.zip,
    //     customer_country: customer.country,
    //   },
    // });

    // return NextResponse.json({ url: session.url });

    // For demo, return success page URL
    return NextResponse.json({
      url: `${request.headers.get('origin')}/shop/success`,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

// app/api/create-payment-intent/route.ts
import {NextResponse} from 'next/server';
import {stripe} from '@/lib/stripe';

export async function POST(request: Request) {
    try {
        const { amount, currency = 'czk' } = await request.json();

        if (typeof amount !== 'number' || amount <= 0) {
            return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Error creating Payment Intent:", error);
        let errorMessage = 'Internal Server Error';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
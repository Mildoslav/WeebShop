// src/app/payment-result/page.tsx
'use client';

import {Suspense, useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {loadStripe, Stripe} from '@stripe/stripe-js';

// Načti Stripe.js
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function PaymentResultContent() {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [stripe, setStripe] = useState<Stripe | null>(null);

    useEffect(() => {
        stripePromise.then(setStripe);
    }, []);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = searchParams.get('payment_intent_client_secret');
        const redirectStatus = searchParams.get('redirect_status');

        if (!clientSecret) {
            setMessage('Error: Payment details not found.');
            setStatus('error');
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case 'succeeded':
                    setMessage('Payment successful!');
                    setStatus('success');
                    break;
                case 'processing':
                    setMessage('Your payment is processing. We will notify you when it is completed.');
                    setStatus('processing');
                    break;
                case 'requires_payment_method':
                    setMessage('Payment failed. Please try another payment method.');
                    setStatus('error');
                    break;
                default:
                    setMessage('Something went wrong.');
                    setStatus('error');
                    break;
            }
        }).catch(error => {
            console.error("Error retrieving Payment Intent:", error);
            setMessage('Error retrieving payment status.');
            setStatus('error');
        });
    }, [stripe, searchParams]);

    if (!status) {
        return <div>Loading payment status...</div>;
    }

    return (
        <div>
            <h1>Payment Result</h1>
            <p>Status: {status}</p>
            <p>{message}</p>
            {status === 'success' && <p>Thank you for your purchase!</p>}
            {status === 'error' && <a href="/checkout">Try again</a>}
        </div>
    );
}


export default function PaymentResultPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentResultContent />
        </Suspense>
    );
}
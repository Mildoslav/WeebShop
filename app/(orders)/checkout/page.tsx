'use client';

import {loadStripe, StripeElementsOptions} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from "@/app/components/CheckoutForm";
import {useEffect, useState} from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Replace with actual order amount from cart
    const orderAmount = 123.45;

    useEffect(() => {
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: orderAmount }),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then(err => { throw new Error(err.error || 'Failed to create Payment Intent') });
                }
                return res.json();
            })
            .then((data) => {
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret);
                } else {
                    throw new Error('Client secret not received');
                }
            })
            .catch((err) => {
                console.error("Error fetching client secret:", err);
                setError(err.message || 'Could not initialize payment.');
            })
            .finally(() => setLoading(false));
    }, [orderAmount]);

    const options: StripeElementsOptions = {
        clientSecret: clientSecret || undefined,
        appearance: {
            theme: 'stripe',
        },
    };

    if (loading) {
        return <div className="flex justify-center items-center ">Loading payment details...</div>;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center ">
                <div className="text-red-500 mb-4">Error: {error}</div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => window.location.reload()}>Try again</button>
            </div>
        );
    }

    if (!clientSecret) {
        return (
            <div className="flex flex-col items-center justify-center ">
                <div className="text-red-500 mb-4">Could not load payment form.</div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => window.location.reload()}>Try again</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center bg-secondary p-4">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <div className="w-full max-w-md bg-primary p-6 rounded-lg shadow-md">
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
}
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

    const orderAmount = 123.45;

    useEffect(() => {
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({amount: orderAmount}),
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then(err => {
                        throw new Error(err.error || 'Failed to create Payment Intent')
                    });
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
        return <div>Loading payment details...</div>;
    }

    if (error) {
        return <div>Error: {error}
            <button onClick={() => window.location.reload()}>Try again</button>
        </div>;
    }

    if (!clientSecret) {
        return <div>Could not load payment form. <button onClick={() => window.location.reload()}>Try again</button>
        </div>;
    }

    return (
        <div>
            <h1>Checkout</h1>
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm/>
            </Elements>
        </div>
    );
}
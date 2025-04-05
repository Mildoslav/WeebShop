// app/components/Checkout.tsx
'use client';

import {EmbeddedCheckout, EmbeddedCheckoutProvider} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {useEffect, useState} from 'react';
import {fetchClientSecret} from '../actions/stripe';
import {useCart} from '../contexts/CartContext';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function Checkout() {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { getTotalPrice } = useCart();
    const totalPrice = getTotalPrice();

    useEffect(() => {
        const getClientSecret = async () => {
            try {
                const secret = await fetchClientSecret(totalPrice);
                setClientSecret(secret);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unexpected error occurred');
                }
            } finally {
                setIsLoading(false);
            }
        };

        getClientSecret();
    }, [totalPrice]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!clientSecret) {
        return <div>Client secret not found.</div>;
    }

    return (
        <div id="checkout" className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md">
                <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{ clientSecret }}
                >
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            </div>
        </div>
    );
}
'use client';

import {FormEvent, useState} from 'react';
import {PaymentElement, useElements, useStripe,} from '@stripe/react-stripe-js';

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);

        if (!stripe || !elements) {
            console.log("Stripe.js hasn't loaded yet.");
            setErrorMessage("Payment system is not ready. Please wait a moment and try again.");
            setIsLoading(false);
            return;
        }


        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment-result`,
            },
        });

        if (error) {
            console.error("Stripe confirmation error:", error);
            setErrorMessage(error.message || "An unexpected error occurred.");
            setIsLoading(false);
        } else {
            console.log("Payment initiated, waiting for redirection or confirmation...");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Payment Details</h2>
            <PaymentElement id="payment-element" />

            <button type="submit" disabled={!stripe || isLoading} style={{ marginTop: '20px' }}>
                {isLoading ? 'Processing...' : 'Pay Now'}
            </button>

            {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
        </form>
    );
}
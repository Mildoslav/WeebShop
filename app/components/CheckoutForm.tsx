'use client';

import {FormEvent, useState} from 'react';
import {PaymentElement, useElements, useStripe,} from '@stripe/react-stripe-js';
import {redirect, RedirectType} from "next/navigation";

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
            // User-facing message translated
            setErrorMessage("Platební systém není připraven. Počkejte prosím okamžik a zkuste to znovu.");
            setIsLoading(false);
            return;
        }

        const apiResult = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/shipment`, {
            cache: 'no-store',
            method: "POST",
            body: JSON.stringify({
                paymentMethod: "stripe"
            })
        });

        if (!apiResult.ok) {
            console.error("Error creating payment intent:", apiResult.statusText);
            // User-facing message translated
            setErrorMessage("Objednávka nebyla vytvořena, zkuste to prosím znovu.");
            setIsLoading(false);

            // Redirect to card page in 3 seconds
            setTimeout(() => {
                redirect("/kosik", RedirectType.push);
            }, 2000);
            return;
        }

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment-result`,
            },
        });

        if (error) {
            console.error("Stripe confirmation error:", error);
            // User-facing fallback message translated
            setErrorMessage(error.message || "Došlo k neočekávané chybě.");
            setIsLoading(false);
        } else {
            console.log("Payment initiated, waiting for redirection or confirmation...");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* User-facing heading translated */}
            <h2>Platební údaje</h2>
            <PaymentElement id="payment-element"/>

            <button type="submit" disabled={!stripe || isLoading} style={{marginTop: '20px'}}>
                {/* User-facing button texts translated */}
                {isLoading ? 'Zpracovává se...' : 'Zaplatit nyní'}
            </button>

            {errorMessage && <div style={{color: 'red', marginTop: '10px'}}>{errorMessage}</div>}
        </form>
    );
}
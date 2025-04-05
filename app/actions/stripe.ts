// app/actions/stripe.ts
export async function fetchClientSecret(amount: number) {
    try {
        const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch client secret');
        }

        const data = await response.json();
        return data.clientSecret;
    } catch (error) {
        console.error('Error fetching client secret:', error);
        throw error;
    }
}
'use client';

import {useEffect, useState} from 'react';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {  // *** ADDED DEPENDENCY ARRAY ***
        async function fetchProducts() {
            try {
                const response = await fetch('/api/products');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError('Failed to fetch products');
                }
                setLoading(false);
            }
        }

        fetchProducts();
    }, []); //  <--  THIS IS THE KEY:  Empty dependency array

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <ul>
            {products.map((product) => (
                <li key={product._id}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                    <img src={product.image} alt={product.name} />
                </li>
            ))}
        </ul>
    );
}

export default ProductList;
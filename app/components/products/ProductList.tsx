"use client";
import {useEffect, useState} from 'react';
import ProductCard from "@/app/components/products/ProductCard"

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    sizes: string[];
}

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const res = await fetch("/api/products");  // Your API endpoint
                if (!res.ok) {
                    throw new Error(`Failed to fetch products: ${res.status}`);
                }
                const data = await res.json();

                // Check if data is an array
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error("Data from API is not an array:", data);
                    setError("Invalid data format from API");
                }
            } catch (e: any) {
                setError(e.message || "Failed to fetch products");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []); // Empty dependency array: runs only once

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main className="flex min-h-screen flex-wrap items-center justify-center p-24">
            {products.map((product) => (
                <ProductCard key={product._id.toString()} product={{...product, _id: parseInt(product._id)}} />  // Render each product
            ))}
        </main>
    );
}
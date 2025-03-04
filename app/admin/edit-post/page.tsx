"use client";
import {useEffect, useState} from 'react';
import Image from "next/image";


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
                const res = await fetch(`http://89.24.77.56:4000/api/products`);  // Your API endpoint
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
                <div key={product._id} className="m-4"> {/* Added key and margin */}
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={256}
                        height={256}
                        className="max-w-xs" />
                    <div className="flex text-center">
                        <h1>{product.name}</h1>
                    </div>
                </div>
            ))}
        </main>
    );
}

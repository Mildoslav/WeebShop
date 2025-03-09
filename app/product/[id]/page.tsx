"use client"
import React, {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import {Product} from '@/utils/types'; // Import the Product type
import Image from "next/image";

const ProductPage = () => {
    const { id } = useParams() as { id: string };
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://89.24.77.56:4000/api/products/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                    {product.image && (
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={500}
                            height={500}
                            className="rounded-md"
                        />
                    )}
                </div>
                <div className="w-full md:w-1/2">
                    <p className="text-xl text-gray-700 mb-4">{product.description}</p>
                    <span className="text-lg font-semibold mb-4 block">
            Cena: {product.price} Kč
          </span>
                    {product.sizes && product.sizes.length > 0 && (
                        <div>
                            <span className="text-lg font-semibold">Velikosti:</span>
                            <div className="flex gap-2 mt-2">
                                {product.sizes.map((size, index) => (
                                    <span
                                        key={index}
                                        className="border border-gray-300 rounded px-2 py-1"
                                    >
                    {size}
                  </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductPage;

"use client"
import React, {useEffect} from 'react';
import {useParams} from 'next/navigation';
import Image from "next/image";
import {Product} from "@/utils/types";

interface Props {
    product: Product;
}

const ProductPage: React.FC<Props> = ({ product }) => {
    const { id } = useParams() as { id: string };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://89.24.77.56:4000/api/products/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                // Handle error, perhaps by setting an error state and displaying a message
            }
        };

        fetchProduct();
    }, [id]);



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
};

export default ProductPage;

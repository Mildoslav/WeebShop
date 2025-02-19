"use client";
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation'; // Correct import
import {getProductById} from '@/utils/getProductById';
import ProductForm from "@/app/components/products/ProductForm";
import {Product} from "@/utils/types";

export default function EditProductPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await getProductById(params.id);
                setProduct(fetchedProduct); // Directly set the product
            } catch (err: any) {
                setError(err.message || 'Error fetching product');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [params.id]);

    const handleSubmit = async (data: Product) => {
        try {
            const response = await fetch(`/api/products/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update product');
            }

            // Redirect after successful update within useEffect
            useEffect(() => {
                router.push('/admin');
            }, [router]);

        } catch (error: any) {
            console.error('Error updating product:', error);
            setError(error.message);
        }
    };


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Conditional rendering with optional chaining
    return (
        <div>
            <h1>Edit Product</h1>
            {product && <ProductForm initialValues={product} onSubmit={handleSubmit} formType="edit" />}
        </div>
    );
}


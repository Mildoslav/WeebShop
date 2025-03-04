"use client"
import {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import {Product} from '@/utils/types'; // Import the Product type
import ProductForm from "@/app/components/products/ProductForm";

const EditProduct = () => {
    const { id } = useParams() as { id: string };
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${process.env.API_URL}/api/products/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
                // Handle error, perhaps by setting an error state and displaying a message
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

    const handleUpdateProduct = async (productData: Product) => { // Type the productData
        try {
            const response = await fetch(`${process.env.API_URL}/api/products/${id}`, {
                method: 'PUT', // Or PATCH if your API supports partial updates
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                const errorData = await response.json(); // Get error details from the response
                throw new Error(`HTTP error! Status: ${response.status} - ${errorData.message || 'Unknown error'}`);
            }

            // Handle success, e.g., redirect or show a success message
            console.log('Product updated successfully!');

        } catch (error) {
            console.error('Error updating product:', error);
            // Handle error, e.g., display an error message to the user
        }
    };

    return (
        <div>
            <h2>Edit Product</h2>
            {product && <ProductForm initialValues={product} onSubmit={handleUpdateProduct} formType="edit" />}
        </div>
    );
};

export default EditProduct;

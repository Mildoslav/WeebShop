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
                const response = await fetch(`http://89.24.77.56:4000/api/products/${id}`);
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

    const handleUpdateProduct = async (productData: Product) => {
        try {
            const response = await fetch(`http://89.24.77.56:4000/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! Status: ${response.status} - ${errorData.message || 'Unknown error'}`);
            }


            alert('Product updated successfully!');

        } catch (error) {
            console.error('Error updating product:', error);
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

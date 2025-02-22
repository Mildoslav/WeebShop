import {Suspense} from 'react';
import ProductCard from "@/app/components/products/ProductCard";

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    sizes: string[];
}

async function getProducts() {
    const res = await fetch('http://localhost:3000/api/products', { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }
    return res.json();
}

export default async function ProductList() {
    const products = await getProducts();

    return (
        <Suspense fallback={<div>Loading products...</div>}>
            <main className="flex min-h-screen flex-wrap items-center justify-center p-24">
                {products.map((product : Product) => (
                    <ProductCard key={product._id.toString()} product={{...product, _id: (product._id)}}/>  // Render each product
                ))}
            </main>
        </Suspense>
    );
}

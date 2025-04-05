import React from 'react';
import AdminLayout from "@/app/admin/layout";
import {Product} from "@/utils/types";
import ProductCard from "@/app/components/products/cards/ProductCard";
import Link from "next/link";

async function getProducts(): Promise<Product[]> {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${API_URL}/api/products`);
    const products: Product[] = await res.json();
    return products;
}

async function ProductsPage() {
    const products = await getProducts();

    return (
        <AdminLayout>
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Products</h1>
                    <Link href="/admin/products/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        New Product
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}

export default ProductsPage;
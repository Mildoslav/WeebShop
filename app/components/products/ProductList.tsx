import {Suspense} from 'react';
import ProductCard from "@/app/components/products/cards/ProductCard";
import { isAdmin } from "@/utils/isAdmin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    moreImages: string[];
    sizes: string[];
    isAdmin: boolean;
}

async function getProducts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }
    return res.json();
}

export default async function ProductList() {
    const products = await getProducts();
    const session = await getServerSession(authOptions);
    const isAdminUser = await isAdmin(session?.user);

    return (
        <Suspense fallback={<div>Loading products...</div>}>
            <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {products.map((product: Product) => (
                    <ProductCard key={product._id.toString()} product={{ ...product, _id: (product._id) }} isAdmin={isAdminUser} />                ))}
            </main>
        </Suspense>
    );
}




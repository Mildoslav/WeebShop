import {notFound} from 'next/navigation';
import {Product} from "@/utils/types";
import Image from "next/image";
import AddToCartButton from "@/app/components/AddToCartButton";

interface ProductPageProps {
    params: { id: string };
}

async function getProduct(id: string): Promise<Product | undefined> {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${API_URL}/api/products/${id}`);
        if (!res.ok) {
            console.error(`Error fetching product with ID ${id}: ${res.status} ${res.statusText}`);
            return undefined;
        }
        const product: Product = await res.json();
        return product;
    } catch (error) {
        console.error(`Failed to fetch product with ID ${id}:`, error);
        return undefined;
    }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
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
                    <p className="text-xl mb-4">{product.description}</p>
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
                    <div className="mt-3">
                        <AddToCartButton product={product} /> {/* Předání celého objektu product */}
                    </div>
                </div>

            </div>
        </div>
    );
}
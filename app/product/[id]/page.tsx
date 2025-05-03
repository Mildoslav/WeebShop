import { notFound } from 'next/navigation';
import { Product } from '@/utils/types';
import AddToCartButton from '@/app/components/AddToCartButton';
import ProductImageGallery from '../ProductImageGallery'

interface ProductPageProps {
    params: { id: string };
}

async function getProduct(id: string): Promise<Product | undefined> {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${API_URL}/api/products/${id}`, { next: { revalidate: 60 }}); // Revalidace každých 60 sekund
        if (!res.ok) {
            console.error(
                `Error fetching product with ID ${id}: ${res.status} ${res.statusText}`
            );
            if (res.status === 404) {
                return undefined; // Produkt nebyl nalezen
            }
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


    const mainImageUrl = product.image ?? '/placeholder-image.jpg';

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6"> {/* Širší kontejner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                <div className="w-full">
                    <ProductImageGallery
                        mainImage={mainImageUrl}
                        moreImages={product.moreImages}
                        altText={product.name}
                    />
                </div>

                <div className="w-full flex flex-col">
                    <h1 className="text-2xl md:text-3xl font-bold mb-3">{product.name}</h1>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <span className="text-xl md:text-2xl font-semibold mb-4 block">
                         Cena: {product.price.toLocaleString('cs-CZ')} Kč {/* Lepší formátování ceny */}
                    </span>

                    {product.sizes && product.sizes.length > 0 && (
                        <div className="mb-4">
                            <span className="text-md font-semibold mb-2 block">Dostupné velikosti:</span>
                            <div className="flex flex-wrap gap-2"> {/* Flex-wrap pro zalamování */}
                                {product.sizes.map((size, index) => (
                                    <span
                                        key={index}
                                        className="border border-gray-300 rounded px-3 py-1 text-sm"
                                    >
                                        {size}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-auto pt-4">
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
}
// app/components/ProductImageGallery.tsx
'use client'; // Označení jako Client Component

import Image from 'next/image';
import { useState } from 'react';

interface ProductImageGalleryProps {
    mainImage: string;
    moreImages?: string[];
    altText: string;
}

export default function ProductImageGallery({
                                                mainImage,
                                                moreImages = [],
                                                altText,
                                            }: ProductImageGalleryProps) {
    const allImages = [
        mainImage,
        ...moreImages.filter((img) => img !== mainImage),
    ];

    const [selectedImage, setSelectedImage] = useState<string>(mainImage);

    const handleThumbnailClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
    };

    if (!mainImage) {
        return <div className="w-full h-[500px] bg-gray-200 rounded-md flex items-center justify-center">Žádný obrázek</div>;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="w-full relative aspect-square"> {/* Použijeme aspect-square pro udržení poměru stran */}
                <Image
                    key={selectedImage}
                    src={selectedImage}
                    alt={altText}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="rounded-md"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

            {allImages.length > 1 && (
                <div className="flex flex-wrap gap-2">
                    {allImages.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => handleThumbnailClick(image)}
                            className={`relative w-16 h-16 md:w-20 md:h-20 border rounded-md overflow-hidden transition-all duration-200 ease-in-out ${
                                selectedImage === image
                                    ? 'border-blue-500 border-2 scale-105'
                                    : 'border-gray-300 hover:border-gray-500 hover:scale-105'
                            }`}
                        >
                            <Image
                                src={image}
                                alt={`${altText} - náhled ${index + 1}`}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes="80px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
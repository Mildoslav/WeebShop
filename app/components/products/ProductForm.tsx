"use client";
import React, { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";

interface ProductData {
    name: string;
    description: string;
    price: number;
    sizes: string[];
    image: string;
    moreImages: string[];
}

interface ProductFormProps {
    onSubmit: (data: ProductData) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
    const [productData, setProductData] = useState<ProductData>({
        name: "",
        description: "",
        price: 0,
        sizes: [],
        image: "",
        moreImages: [],
    });

    const availableSizes = ["XS", "S", "M", "L", "XL"];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSizeChange = (size: string) => {
        setProductData((prevData) => ({
            ...prevData,
            sizes: prevData.sizes.includes(size)
                ? prevData.sizes.filter((s) => s !== size)
                : [...prevData.sizes, size],
        }));
    };

    const handleUploadComplete = (res: { url: string }[], isMainImage: boolean = true) => {
        if (res && res.length > 0) {
            setProductData((prevData) => ({
                ...prevData,
                [isMainImage ? "image" : "moreImages"]: isMainImage
                    ? res[0].url.trim()
                    : [...prevData.moreImages, ...res.map((file) => file.url.trim())],
            }));
        } else {
            console.error("Upload failed or URL is missing:", res);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(productData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Přidat nový produkt</h2>

            <div className="mb-4">
                <label className="block font-medium mb-2 text-gray-700">Název produktu</label>
                <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-2 text-gray-700">Popis</label>
                <textarea
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-2 text-gray-700">Cena</label>
                <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-2 text-gray-700">Velikosti</label>
                <div className="flex flex-wrap gap-3">
                    {availableSizes.map((size) => (
                        <label key={size} className="flex items-center gap-2 text-gray-600">
                            <input
                                type="checkbox"
                                checked={productData.sizes.includes(size)}
                                onChange={() => handleSizeChange(size)}
                                className="h-4 w-4 text-blue-500 focus:ring-blue-400"
                            />
                            {size}
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-2 text-gray-700">Hlavní obrázek</label>
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => handleUploadComplete(res, true)}
                    onUploadError={(error) => console.error("Chyba při nahrávání:", error)}
                />
                {productData.image && (
                    <div className="mt-4">
                        <Image
                            src={productData.image}
                            alt="Hlavní obrázek"
                            width={128}
                            height={128}
                            className="object-cover rounded-lg border border-gray-300"
                        />
                    </div>
                )}
            </div>

            <div className="mb-4">
                <label className="block font-medium mb-2 text-gray-700">Další obrázky</label>
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => handleUploadComplete(res, false)}
                    onUploadError={(error) => console.error("Chyba při nahrávání:", error)}
                />
                <div className="mt-4 flex flex-wrap gap-3">
                    {productData.moreImages.map((url, index) => (
                        <Image
                            key={index}
                            src={url}
                            alt={`Další obrázek ${index + 1}`}
                            width={64}
                            height={64}
                            className="object-cover rounded-lg border border-gray-300"
                        />
                    ))}
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-200"
            >
                Přidat produkt
            </button>
        </form>
    );
};

export default ProductForm;
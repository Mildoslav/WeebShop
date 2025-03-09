import React, {useEffect, useState} from "react";
import {UploadButton} from "@/utils/uploadthing";
import Image from "next/image";

interface ProductData {
    name?: string;
    description?: string;
    price?: number;
    sizes?: string[];
    image?: string;
    // ... other product properties as needed
}

interface ProductFormProps {
    initialValues?: ProductData;
    onSubmit: (data: ProductData) => void;
    formType: "edit" | "add";
}

const ProductForm: React.FC<ProductFormProps> = ({ initialValues, onSubmit, formType }) => {
    const [productData, setProductData] = useState<ProductData>(initialValues || {});
    const availableSizes = ["XS", "S", "M", "L", "XL"];

    useEffect(() => {
        setProductData(initialValues || {});
    }, [initialValues]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSizeChange = (size: string) => {
        if (productData.sizes?.includes(size)) {
            setProductData(prevData => ({ ...prevData, sizes: prevData.sizes?.filter(s => s !== size) }));
        } else {
            setProductData(prevData => ({ ...prevData, sizes: [...(prevData.sizes || []), size] }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(productData);
    };

  const handleUploadComplete = (res: { url: string }[]) => {
        if (res && res[0] && res[0].url) {
            setProductData(prevData => ({ ...prevData, image: res[0].url.trim() }));
        } else {
            console.error("Upload complete but URL is missing:", res);
        }
    };

  return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md">
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                    Název produktu:
                </label>
                <input
                    type="text"
                    name="name"
                    value={productData.name || ""}
                    onChange={handleChange}
                    required
                    placeholder="Zadejte název"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                    Popis:
                </label>
                <textarea
                    name="description"
                    value={productData.description || ""}
                    onChange={handleChange}
                    required
                    placeholder="Popis produktu"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows={4}
                />
            </div>

            <div className="mb-4">
                <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
                    Cena:
                </label>
                <input
                    type="number"
                    name="price"
                    value={productData.price || ""}
                    onChange={handleChange}
                    required
                    placeholder="Cena produktu"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    step="0.01"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Velikosti:</label>
                <div className="flex flex-wrap gap-2">
                    {availableSizes.map(size => (
                        <label key={size} className="inline-flex items-center">
                            <input
                                type="checkbox"
                                value={size}
                                checked={productData.sizes?.includes(size) || false}
                                onChange={() => handleSizeChange(size)}
                                className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                            />
                            <span className="ml-2 text-gray-700">{size}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-4">
        {productData.image ? (
                    <div className="relative">
            <Image
                            src={productData.image}
                            alt="Obrázek produktu"
                            width={128}
                            height={128}
                            className="rounded-md"
                        />
                    </div>
        ) : (
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={handleUploadComplete}
            onUploadError={(error: Error) => {
              console.log(`Upload error: ${error.message}`);
            }}
          />
                )}
            </div>

            <div>
                <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {formType === "edit" ? "Aktualizovat produkt" : "Přidat produkt"}
                </button>
            </div>
        </form>
    );
};

export default ProductForm;

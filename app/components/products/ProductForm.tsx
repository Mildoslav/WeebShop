import React, {useEffect, useState} from 'react';
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
    const availableSizes = ['XS', 'S', 'M', 'L', 'XL'];


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

    const handleUploadComplete = (res: any) => {
        if (res && res[0] && res[0].url) {
            setProductData(prevData => ({ ...prevData, image: res[0].url.trim() }));
        } else {
            console.error("Upload complete but URL is missing:", res);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Input fields */}
            <label htmlFor="name">Product Name:</label>
            <input type="text" name="name" value={productData.name || ''} onChange={handleChange} required />

            <label htmlFor="description">Description:</label>
            <textarea name="description" value={productData.description || ''} onChange={handleChange} required />

            <label htmlFor="price">Price:</label>
            <input type="number" name="price" value={productData.price || ''} onChange={handleChange} required />

            <label>Sizes:</label>
            <div>
                {availableSizes.map(size => (
                    <label key={size}>
                        <input
                            type="checkbox"
                            value={size}
                            checked={productData.sizes?.includes(size) || false}
                            onChange={() => handleSizeChange(size)}
                        />
                        <span>{size}</span>
                    </label>
                ))}
            </div>

            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={handleUploadComplete}
                onUploadError={(error: Error) => {
                    console.log(`Upload error: ${error.message}`);
                }}
            />

            {productData.image && (
                <div>
                    <Image src={productData.image} alt="Product Image" width={100} height={100} />
                </div>
            )}


            <button type="submit">{formType === "edit" ? "Update Product" : "Add Product"}</button>
        </form>
    );
};

export default ProductForm;

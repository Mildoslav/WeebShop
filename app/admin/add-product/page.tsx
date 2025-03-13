"use client"
import React, {useState} from 'react';
import {UploadButton} from "@/utils/uploadthing";
import Image from "next/image";

function Page() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [stateSizes, setStateSizes] = useState<string[]>([]);
    const [image, setImage] = useState('');



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const productData = {
            name,
            price: parseFloat(price),
            description,
            sizes: stateSizes,
            image
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                setName('');
                setPrice('');
                setDescription('');
                setStateSizes([]);
                setImage('');
            } else {
                const errorData = await response.json();
                const errorMessage = errorData?.message || 'Failed to add product';
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            console.error('Error adding product:', error.message);
            alert(`Error adding product: ${error.message}`);
        }
    };

    const availableSizes = ['XS', 'S', 'M', 'L', 'XL'];

    return (
        <main className="flex w-full my-auto">
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-black">Add New Product</h2>

                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                        Product Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
                        Price:
                    </label>
                    <input
                        type="number"
                        id="price"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                        Product Description:
                    </label>
                    <textarea
                        id="description"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Sizes:
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {availableSizes.map((size) => (
                            <label key={size} className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-5 w-5 text-indigo-600 rounded"
                                    value={size}
                                    checked={stateSizes.includes(size)}
                                    onChange={() => {
                                        if (stateSizes.includes(size)) {
                                            setStateSizes(oldSizes => oldSizes.filter(s => s !== size));
                                        } else {
                                            setStateSizes(oldSizes => [...oldSizes, size]);
                                        }
                                    }}
                                />
                                <span className="ml-2 text-gray-700">{size}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    {image === '' ? (
                        <UploadButton
                            endpoint="imageUploader"
                            onClientUploadComplete={(res) => {
                                if (res && res[0] && res[0].url) {
                                    setImage(res[0].url.trim());
                                    console.log("img: ", res[0].url);
                                } else {
                                    console.error("Upload complete but URL is missing:", res);
                                }
                            }}
                            onUploadError={(error: Error) => {
                                console.log(`Upload error: ${error.message}`);
                            }}
                        />
                    ) : (
                        <div className="relative">
                            <Image
                                src={image}
                                alt={"Product image of: " + name}
                                width={128}
                                height={128}
                                className="rounded-md"
                            />
                        </div>
                    )}
                </div>

                <div>
                    <button
                        type="submit"
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </main>
    );
}

export default Page;
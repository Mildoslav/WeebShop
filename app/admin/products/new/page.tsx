"use client";

import React from "react";
import ProductForm from "@/app/components/products/ProductForm";

function Page() {
    const handleSubmit = (formData: {
        name: string;
        description: string;
        price: number;
        sizes: string[];
        image: string;
        moreImages: string[];
    }) => {
        console.log("Formulář odeslán:", formData);
    };

    return (
        <ProductForm onSubmit={handleSubmit} />
    );
}

export default Page;
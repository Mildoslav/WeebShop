import React from 'react';
import ProductList from './components/products/ProductList';
import ImageSlider from "@/app/components/products/ImageSlider";

function Page() {
    return (
        <div className="flex flex-wrap">
            <main className="flex-1 p-4">
                <div className="justify-center flex">
                    <ImageSlider />
                </div>
                <div className="flex justify-center">
                    <ProductList />
                </div>
            </main>
        </div>
    );
}

export default Page;
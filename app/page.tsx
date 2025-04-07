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
                <h1 className="text-3xl font-bold text-center mt-4">Všechny produkty</h1>
                <div className="flex justify-center">
                    <ProductList />
                </div>
                <div className="flex justify-center mt-4 rounded-lg">
                    <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                        Načíst další
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Page;
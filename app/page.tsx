import React from 'react';
import ProductList from './components/products/ProductList';
import ImageSlider from "@/app/components/products/ImageSlider";
import Sidebar from "@/app/components/sidebar/Sidebar";

function Page() {
    return (
        <div className="flex flex-wrap">
            <main className="flex-1 p-4">
                <div className="justify-center flex">
                    <ImageSlider />
                </div>
                <div className="flex justify-center">
                    <aside className="hidden lg:block w-64 min-h-screen">
                        <Sidebar />
                    </aside>
                    <ProductList />
                </div>
            </main>
        </div>
    );
}

export default Page;
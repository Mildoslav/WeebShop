import React from 'react';
import ProductList from './components/products/ProductList'
import ThemeCategory from "@/app/components/products/ThemeCategory";

function Page() {
    return (
        <div>
            <div>
                <ThemeCategory />
            </div>
            <ProductList />
        </div>
    );
}

export default Page;
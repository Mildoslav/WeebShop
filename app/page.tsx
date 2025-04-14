import React from 'react';
import ProductList from './components/products/ProductList';
import ImageSlider from "@/app/components/products/ImageSlider";
import Hero from "@/app/components/heroBanner/Hero";
import EmailSub from "@/app/components/subscription/EmailSub";

function Page() {
    return (
        <div className="flex flex-wrap">

            <Hero imageUrl="https://2ucczhzrfg.ufs.sh/f/04939xqzDQVfD0LgfpnRnYhfVpU2406vwrE95LIoml7z1FCZ" title="WeebShop" altText={ "WeebShop"}  />

            <main className="flex-1 p-4">
                <div className="justify-center flex">
                    {/* <ImageSlider /> */}
                </div>
                <h1 className="text-3xl font-bold text-center mt-4">Všechny produkty</h1>
                <div className="flex justify-center">
                    <ProductList />
                </div>
            </main>
            <Hero imageUrl="https://2ucczhzrfg.ufs.sh/f/04939xqzDQVfC27sHTzpJx9B63hRte5EFl78UvIYXHgdumi1" title="Jarnni slevy" altText={ "WeebShop"}  />
            <div className="flex-1 p-4">
                <EmailSub />
            </div>
        </div>
    );
}

export default Page;
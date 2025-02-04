import React from 'react';
import ItemCard from "@/app/components/cards/ItemCard";
import tricko from "../public/triko.png"

function Page() {
    return (
        <div className="flex justify-between p-2 ">
            <div>
                <ItemCard
                    img={tricko}
                    name="Mega hustacky tricko"
                    stock={69}
                    price={6969}
                />
            </div>
            <div>
                <ItemCard
                    img={tricko}
                    name="Mega hustacky tricko"
                    stock={69}
                    price={6969}
                />
            </div>
            <div>
                <ItemCard
                    img={tricko}
                    name="Mega hustacky tricko"
                    stock={69}
                    price={6969}
                />
            </div>
        </div>
    );
}

export default Page;
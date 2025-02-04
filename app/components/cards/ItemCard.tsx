import React from 'react';
import Image, {StaticImageData} from "next/image";
import AddButton from "@/app/components/cards/AddButton";

interface ItemCardProps {
    img: StaticImageData,
    price: number,
    stock: number,
    name: string
}

function ItemCard ({ img, price, name, stock } : ItemCardProps) {
    return (
        <div className="border flex flex-col">
            <Image width={256} height={256} src={img} alt={"Product image of: " + name} />
            <div className=" flex justify-center border text-2xl m-3">
                <h1>{name}</h1>
            </div>
            <div className="flex justify-center border m-2">
                <h3>Skladem {stock} kusů</h3>
            </div>
            <div className="flex justify-center border m-3">
                <h1>{price} Kč</h1>
            </div>
            <div className="flex justify-center border mb-2">
                <AddButton />
            </div>
        </div>
    );
}

export default ItemCard;
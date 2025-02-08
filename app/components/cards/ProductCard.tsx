import React from 'react';
import Image from "next/image";
import AddButton from "@/app/components/cards/AddButton";
import {Product} from "../../../utils/types";

interface Props {
    product: Product; // Changed to accept a single product
}

const ProductCard: React.FC<Props> = ({ product }) => { // Removed products prop
    if (!product) { // Handle the case where no product is provided
        return <div>Loading...</div>; // Or any other appropriate placeholder
    }

    return (
        <div className="border flex flex-col">
            <Image src={product.image} alt={"Product image of: " + product.name} width={256} height={256} />
            <div className="flex justify-center border text-2xl m-3">
                <h1>{product.name}</h1>
            </div>
            <div className="flex justify-center border m-3">
                <h1>{product.price} Kč</h1>
            </div>
            <div className="flex justify-center border mb-2">
                <AddButton />
            </div>
        </div>
    );
};

export default ProductCard;

import React from 'react';
import Image from "next/image";
import AddButton from "@/app/components/AddButton";
import {Product} from "@/utils/types";
import EditButton from "@/app/admin/components/EditButton";
import DeleteButton from "@/app/admin/components/DeleteButton";

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="m-6">
            <div className="border flex flex-col">
                {product?.image == null ? null
                    : <Image src={product?.image} alt={"Product image of: " + product.name} width={256} height={256}/>}
                <div className="flex justify-center border text-2xl m-3">
                    <h1>{product.name}</h1>
                </div>
                <div className="flex justify-center border m-3">
                    <h1>{product.price} Kč</h1>
                </div>
                <div className="flex justify-center border mb-2">
                    <AddButton/>
                </div>
                <div className="flex justify-center border mb-2">
                    <EditButton id={product._id}/>
                </div>
                <div className="flex justify-center border mb-2">
                    <DeleteButton id={product._id}/>
                </div>
            </div>
        </div>

    );
};

export default ProductCard;

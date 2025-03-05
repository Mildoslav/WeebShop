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
        <div className="m-2 md:m-6">
            <div
                className="border flex flex-col relative transform transition-all duration-300 ease-in-out
                hover:scale-105 hover:shadow-xl hover:-translate-y-2 cursor-pointer rounded-lg overflow-hidden
                w-full md:w-64 h-[300px] md:h-[400px]">
                <div className="w-64 h-64 relative">
                    <div className="absolute top-2 right-2 z-10">
                        <AddButton/>
                    </div>
                    {product?.image == null ? null
                        : <Image
                            src={product?.image}
                            alt={"Product image of: " + product.name}
                            fill
                            style={{objectFit: 'cover'}}
                            className="p-2"
                        />}
                </div>
                <div className="flex justify-center border text-2xl m-3 transition-colors">
                    <h1 className="truncate px-2">{product.name}</h1>
                </div>
                <div className="flex justify-center border m-3">
                    <h1>{product.price} Kč</h1>
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

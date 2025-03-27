import React from "react";
import Image from "next/image";
import AddToCartButton from "@/app/components/AddToCartButton";
import {Product} from "@/utils/types";
import EditButton from "@/app/admin/components/EditButton";
import DeleteButton from "@/app/admin/components/DeleteButton";
import Link from "next/link";

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    if (!product) {
        return <div>Loading...</div>;
    }

    const productId = product._id;

    return (
        <div className="m-2 md:m-6 flex justify-center cursor-pointer">
            <div className="
            ease-in-out hover:scale-105 hover:shadow-xl hover:-translate-y-2 rounded-lg overflow-hidden
            w-full md:w-80 md:h-[500px] hover:shadow-fuchsia-950 border border-light">
                <Link href={`/product/${productId}`}>
                    <div className="w-full h-80 relative">
                        {product.image ? (
                            <Image
                                src={product.image}
                                alt={"Product image of: " + product.name}
                                fill
                                style={{ objectFit: "cover" }}
                                className="p-4"
                            />
                        ) : null}
                    </div>
                </Link>
                <Link href={`/product/${productId}`}>
                    <div className="flex flex-col gap-2 p-3">
                        <h1 className="truncate text-2xl">{product.name}</h1>
                        <h2 className="text-lg">{product.price} Kč</h2>
                    </div>
                </Link>
                <div className="flex flex-col items-center justify-center p-3 border-t m-1">
                    <DeleteButton id={String(productId)} />
                    <AddToCartButton product={product} />
                    <EditButton id={String(productId)} />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;


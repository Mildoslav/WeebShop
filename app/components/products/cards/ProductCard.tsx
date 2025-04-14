"use client"
import React from "react";
import Image from "next/image";
import AddToCartButton from "@/app/components/AddToCartButton";
import {Product} from "@/utils/types";
import Link from "next/link";
import {AnimatePresence, motion} from "framer-motion";


interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({product}) => {
    if (!product) {
        return <div>Loading...</div>;
    }

    const productId = product._id;

    return (
        <AnimatePresence>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="m-2 md:m-6 flex justify-center cursor-pointer">
                <div
                    className="rounded-lg overflow-hidden w-full md:w-80 md:h-[500px]  border border-light shadow-white">
                    <Link href={`/product/${productId}`}>
                        <div className="w-full h-80 relative">
                            {product.image ? (
                                <Image
                                    src={product.image}
                                    alt={"Product image of: " + product.name}
                                    fill
                                    style={{objectFit: "cover"}}
                                    className="p-4"
                                />
                            ) : null}
                        </div>
                    </Link>
                    <Link href={`/product/${productId}`}>
                        <div className="flex flex-col gap-2 p-3 text-center">
                            <h1 className="truncate text-2xl">{product.name}</h1>
                            <h2 className="text-lg">{product.price} Kč</h2>
                        </div>
                    </Link>
                    <div className="flex flex-col items-center justify-center p-3 border-t m-1">
                        <AddToCartButton product={product}/>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProductCard;


"use client";

import {useCart} from "../contexts/CartContext";
import {Product} from "@/utils/types";
import toast from 'react-hot-toast';

interface AddToCartButtonProps {
    product: Product;
}

function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addToCart } = useCart();

    const handleClick = () => {
        addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
        });
        toast.success(`${product.name} byl přidán do košíku!`, {
            duration: 3000,
            position: 'bottom-center',
        });
    };

    return (
        <button
            onClick={handleClick}
            className="bg-light hover:bg-button1 text-white font-bold py-2 px-4 mb-2 rounded w-full sm:w-auto"
        >
            Přidat do košíku
        </button>
    );
}

export default AddToCartButton;
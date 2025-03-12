"use client";
import React from "react";
import {useCart} from "../contexts/CartContext";

interface AddButtonProps {
    productId: string;
}

const AddButton: React.FC<AddButtonProps> = ({ productId }) => {
    const { addToCart } = useCart();

    const handleAdd = () => {
        addToCart(productId);
    };

    return (
        <button
            onClick={handleAdd}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
        >
            Přidat do košíku
        </button>
    );
};

export default AddButton;

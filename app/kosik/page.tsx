"use client";

import React from 'react';
import {useCart} from '../contexts/CartContext';
import Image from "next/image";
import toast from "react-hot-toast";

function KosikPage() {
    const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
    const totalPrice = getTotalPrice();

    const handleRemoveFromCart = (id: string) => {
        removeFromCart(id);
        toast.success("Produkt odebrán z košíku");
    }
    const handleQuantityChange = (id: string, quantity: number) => {
        updateQuantity(id, quantity);
        toast.success("Množství produktu bylo upraveno");
    }
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Váš košík</h1>
            {cartItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-3">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center border-b border-gray-300 py-4">
                                <div className="w-24 h-24 relative mr-4">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        style={{ objectFit: "cover" }}
                                        className="rounded"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <h2 className="font-medium">{item.name}</h2>
                                    <p className="text-gray-500">{item.price.toFixed(2)} Kč</p>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                                        className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-l">-
                                    </button>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                        className="w-12 text-center border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                        className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-r">+
                                    </button>
                                    <button
                                        onClick={() => handleRemoveFromCart(item.id)}
                                        className="ml-4 bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                                    >
                                        Odebrat
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="md:col-span-1 p-4 bg-gray-100 rounded">
                        <h3 className="font-bold mb-2">Celkem:</h3>
                        <p className="text-2xl">{totalPrice.toFixed(2)} Kč</p>
                        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded">
                            Přejít k objednávce
                        </button>
                    </div>
                </div>
            ) : (
                <p>Váš košík je prázdný.</p>
            )}
        </div>
    );
}

export default KosikPage;
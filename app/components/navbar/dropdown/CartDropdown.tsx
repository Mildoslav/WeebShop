"use client";
import React, {useState} from 'react';
import {IoCartOutline} from "react-icons/io5";
import Link from "next/link";
import {useCart} from "@/app/contexts/CartContext";
import Image from "next/image";

function CartDropdown() {
    const [open, setOpen] = useState(false);
    const { cartItems, getTotalPrice } = useCart();
    const totalPrice = getTotalPrice() || 0;

    return (
        <div onClick={() => setOpen(!open)} className="relative cursor-pointer">
            <div className="flex items-center">
                <IoCartOutline size={28} />
                <div className="pl-1 hidden sm:block">Kč {totalPrice.toFixed(2)}</div>
            </div>
            <ul className={`${open ? "block" : "hidden"} absolute right-0 bg-white text-black p-2 mt-2 rounded-lg shadow-xl z-10 min-w-[200px]`}>
                {cartItems.length > 0 ? (
                    <>
                        {cartItems.map((item) => (
                            <li key={item.id} className="flex items-center py-2">
                                <div className="w-12 h-12 relative mr-2">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        style={{objectFit: "cover"}}
                                        className="rounded"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm">{item.name}</p>
                                    <p className="text-xs text-gray-500">{item.quantity}x {item.price.toFixed(2)} Kč</p>
                                </div>
                            </li>
                        ))}
                        <li className="border-t border-gray-300 mt-2 pt-2 text-right">
                            Celkem: {totalPrice.toFixed(2)} Kč
                        </li>
                        <Link href="/kosik">
                            <li className="text-center mt-2 bg-blue-500 hover:bg-blue-700 text-white py-2 rounded">Přejít do košíku</li>
                        </Link>
                    </>
                ) : (
                    <li className="text-center">Košík je prázdný</li>
                )}
            </ul>
        </div>
    );
}

export default CartDropdown;
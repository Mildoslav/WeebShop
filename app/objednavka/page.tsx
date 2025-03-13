"use client"
import React from 'react';
import { useCart } from '../contexts/CartContext';
import Image from 'next/image';

function Page() {
    const { cartItems, getTotalPrice } = useCart();
    const totalPrice = getTotalPrice();

    return (
        <div className="border flex  px-20">
            <h1 className="text-2xl font-bold mb-4">Objednávka</h1>

            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Osobní údaje</h2>
                <label htmlFor="name">Jméno a příjmení</label>
                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full h-6 border border-solid border-black py-1 px-2.5 rounded text-[13px]"
                    name="name"
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full h-6 border border-solid border-black py-1 px-2.5 rounded text-[13px]"
                    name="email"
                />

                <label htmlFor="phone">Telefon</label>
                <input
                    type="tel"
                    placeholder="Telefon"
                    className="w-full h-6 border border-solid border-black py-1 px-2.5 rounded text-[13px]"
                    name="phone"
                />
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Adresa doručení</h2>
                <label htmlFor="street">Ulice</label>
                <input
                    type="text"
                    className="w-full h-6 border border-solid border-black py-1 px-2.5 rounded text-[13px]"
                    name="street"
                />

                <label htmlFor="houseNumber">Číslo domu</label>
                <input
                    type="text"
                    className="w-full h-6 border border-solid border-black py-1 px-2.5 rounded text-[13px]"
                    name="houseNumber"
                />

                <label htmlFor="city">Město</label>
                <input
                    type="text"
                    className="w-full h-6 border border-solid border-black py-1 px-2.5 rounded text-[13px]"
                    name="city"
                />

                <label htmlFor="postalCode">PSČ</label>
                <input
                    type="text"
                    className="w-full h-6 border border-solid border-black py-1 px-2.5 rounded text-[13px]"
                    name="postalCode"
                />
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Způsob doručení</h2>
                <select className="w-full h-6 border border-solid border-black py-1 px-2.5 rounded text-[13px]" name="deliveryMethod">
                    <option value="post">Pošta</option>
                    <option value="courier">Kurýr</option>
                    <option value="pickup">Osobní odběr</option>
                </select>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Způsob platby</h2>
                <select className="w-full h-6 border border-solid border-black py-1 px-2.5 rounded text-[13px]" name="paymentMethod">
                    <option value="card">Platební karta</option>
                    <option value="bankTransfer">Bankovní převod</option>
                    <option value="cashOnDelivery">Dobírka</option>
                </select>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Produkty v košíku</h2>
                {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center border-b border-gray-300 py-2">
                        <div className="w-16 h-16 relative mr-2">
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                style={{ objectFit: "cover" }}
                                className="rounded"
                            />
                        </div>
                        <div className="flex-grow">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-gray-500">{item.price.toFixed(2)} Kč</p>
                        </div>
                    </div>
                ))}
                <div className="mt-4">
                    <h3 className="font-bold">Celkem: {totalPrice.toFixed(2)} Kč</h3>
                </div>
            </div>

            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Odeslat objednávku
            </button>
        </div>
    );
}

export default Page;
'use client'

import React from 'react';
import Link from "next/link";
import {redirect, RedirectType} from "next/navigation";

const ShipmentPage: React.FC = () => {

    const [fullName, setFullName] = React.useState<string>('');
    const [address, setAddress] = React.useState<string>('');
    const [city, setCity] = React.useState<string>('');
    const [postalCode, setPostalCode] = React.useState<number>();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        // Handle form submission logic here
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order/shipment`, {
            cache: 'no-store',
            method: "POST",
            body: JSON.stringify({
                fullName: fullName,
                address: address,
                city: city,
                postalCode: postalCode,
                cartItems: cart,
                price: cart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)
            })
        });
        if (res.ok) {
            redirect("/checkout", RedirectType.push);
        } else {
            // todo: handle error
        }
    }

    return (
        <div className="shipment-page p-6 bg-primary flex items-center justify-center">
            <div className="bg-secondary p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Dodací údaje</h1>
                <form className="shipment-form space-y-4">
                    <div className="form-group">
                        <label htmlFor="name" className="block text-sm font-medium text-white">Celé jméno:</label>
                        <input type="text" id="name" name="name" required
                               placeholder="Jméno a příjmení"
                               value={fullName}
                               onChange={(e) => setFullName(e.target.value)}
                               className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address" className="block text-sm font-medium text-white">Adresa:</label>
                        <input type="text" id="address" name="address" required
                               placeholder="Ulice a číslo popisné"
                               value={address}
                               onChange={(e) => setAddress(e.target.value)}
                               className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city" className="block text-sm font-medium text-white">Město:</label>
                        <input type="text" id="city" name="city" required
                               placeholder="Město"
                               value={city}
                               onChange={(e) => setCity(e.target.value)}
                               className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="postalCode"
                               className="block text-sm font-medium text-white">Směrovacíčíslo:</label>
                        <input type="number" id="postalCode" name="postalCode" required
                               placeholder="PSČ"
                               value={postalCode}
                               className=" text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                    </div>
                    <Link href="/checkout">
                        <button type="submit" onClick={handleSubmit}
                                className="w-full py-2 px-4 bg-button2 text-white font-semibold rounded-md shadow-sm hover:bg-button1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Submit
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default ShipmentPage;
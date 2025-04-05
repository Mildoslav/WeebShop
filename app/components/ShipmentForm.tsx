import React from 'react';
import Link from "next/link";

function ShipmentForm() {
    return (
        <div className="shipment-page p-6 bg-secondary flex items-center justify-center">
            <div className="bg-secondary p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Dodací údaje</h1>
                <form className="shipment-form space-y-4">
                    <div className="form-group">
                        <label htmlFor="name" className="block text-sm font-medium text-white">Celé jméno:</label>
                        <input type="text" id="name" name="name" required
                               className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address" className="block text-sm font-medium text-white">Adresa:</label>
                        <input type="text" id="address" name="address" required
                               className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="city" className="block text-sm font-medium text-white">Město:</label>
                        <input type="text" id="city" name="city" required
                               className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="postalCode" className="block text-sm font-medium text-white">Směrovací
                            číslo:</label>
                        <input type="number" id="postalCode" name="postalCode" required
                               className=" text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"/>
                    </div>
                    <Link href="/checkout">
                        <button type="submit"
                                className="w-full mt-6 py-2 px-4 bg-button2 text-white  rounded-md shadow-sm hover:bg-button1 focus">
                            Přejít k zaplacení
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default ShipmentForm;
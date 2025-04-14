"use client";
import React, { useState } from 'react';
import { MdOutlineAlternateEmail } from "react-icons/md";


function EmailSub() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Odebíraný email:', email);
        alert(`Děkujeme za přihlášení s emailem: ${email}`);
        setEmail('');
    };

    return (
        <div className="w-full bg-gradient-to-r text-white py-12 md:py-16 flex justify-center">
            <div>
                <MdOutlineAlternateEmail size={100} />

            </div>
            <div className="px-4 md:px-6 ">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    Zůstaňte v obraze!
                </h2>
                <p className="text-gray-300 text-lg mb-8">
                    Přihlaste se k odběru našich novinek a získejte exkluzivní nabídky přímo do vaší schránky.
                </p>
            </div>
            <div>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto"
                >
                    <label htmlFor="email-sub" className="sr-only">
                        Emailová adresa
                    </label>
                    <input
                        id="email-sub"
                        type="email"
                        placeholder="Váš email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-grow p-3 border border-gray-600 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                    />
                    <button
                        type="submit"
                        className="bg-button1 hover:bg-button2 text-white font-semibold py-3 px-6 rounded-md  focus:ring-offset-gray-800 transition duration-300 whitespace-nowrap"
                    >
                        Přihlásit se k odběru
                    </button>
                </form>
                <div className="text-xs text-gray-300 mt-2">
                    Souhlasim se zpracovanim osobnich udaju
                </div>
            </div>
        </div>
    );
}

export default EmailSub;
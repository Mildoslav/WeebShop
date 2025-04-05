import React from 'react';
import Link from 'next/link';
import {FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-secondary text-white p-8 w-full">
            <div className="container mx-auto flex  justify-between  ">
                {/* Links Section */}
                <div className="flex flex-col  gap-6 md:mb-0 text-lg">
                    <Link href="/public" className="hover:underline">O nás</Link>
                    <Link href="/public" className="hover:underline">Kontakt</Link>
                    <Link href="/public" className="hover:underline">Podmínky ochrany osobních údajů</Link>
                    <Link href="/public" className="hover:underline">Obchodní podmínky</Link>
                </div>

                {/* Contact Information */}
                <div className="flex flex-col  mb-8 md:mb-0 text-lg">
                    <p>Kontaktujte nás: info@eshop.com</p>
                    <p>Telefon: +123 456 789</p>
                </div>
            </div>
            {/* Social Media Icons */}
            <div className="flex gap-8 justify-center mt-7">
                <FaFacebook size={32} className="hover:text-blue-600 transition-colors duration-300" />
                <FaTwitter size={32} className="hover:text-blue-400 transition-colors duration-300" />
                <FaInstagram size={32} className="hover:text-pink-500 transition-colors duration-300" />
            </div>
        </footer>
    );
}

export default Footer;
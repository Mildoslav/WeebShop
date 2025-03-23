import React from 'react';
import Link from 'next/link';
import {FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-secondary text-white p-8 w-full">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Links Section */}
                <div className="flex flex-col md:flex-row gap-8 mb-8 md:mb-0 text-lg">
                    <Link href="/" className="hover:underline">O nás</Link>
                    <Link href="/" className="hover:underline">Kontakt</Link>
                    <Link href="/" className="hover:underline">Podmínky ochrany osobních údajů</Link>
                    <Link href="/" className="hover:underline">Obchodní podmínky</Link>
                </div>

                {/* Contact Information */}
                <div className="flex flex-col items-center mb-8 md:mb-0 text-lg">
                    <p>Kontaktujte nás: info@eshop.com</p>
                    <p>Telefon: +123 456 789</p>
                </div>

                {/* Social Media Icons */}
                <div className="flex gap-8">
                    <FaFacebook size={32} />
                    <FaTwitter size={32} />
                    <FaInstagram size={32} />
                </div>
            </div>
        </footer>
    );
}

export default Footer;
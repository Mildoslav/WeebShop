"use client";
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {FaShoppingCart} from 'react-icons/fa';
import {useCart} from "@/app/contexts/CartContext";
import CartDropdown from "@/app/components/navbar/dropdown/CartDropdown";

function CategoryNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { cartItems } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <div className={`flex justify-center align-middle p-2 px-12 gap-3 bg-light ${isScrolled ? 'fixed top-0 left-0 w-full shadow-md z-50' : ''}`}>
            <div>
                <Link href={"/"}>
                    Akce
                </Link>
            </div>

            <div>
                <Link href={"/"}>
                    Výprodej
                </Link>
            </div>

            <div>
                <Link href={"/"}>
                    Kategorie
                </Link>
            </div>

            <div>
                <Link href={"/"}>
                    Anime
                </Link>
            </div>

            <div>
                <Link href={"/"}>
                    Bižuterie
                </Link>
            </div>

            {isScrolled && (
                <div className="ml-auto flex items-center relative">
                    <FaShoppingCart size={24} onClick={() => setDropdownOpen(!dropdownOpen)} />
                    <span className="ml-2">{cartItemCount}</span>
                    <div className="absolute top-full right-0 mt-2">
                        <CartDropdown open={dropdownOpen} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default CategoryNavbar;
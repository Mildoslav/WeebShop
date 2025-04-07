"use client"
import React, {useState} from 'react';
import Logo from '../../../public/logo.png';
import Image from "next/image";
import UserAuth from "@/app/components/navbar/UserAuth";
import Link from "next/link";
import CartDropdown from "@/app/components/navbar/dropdown/CartDropdown";
import {GiHamburgerMenu} from "react-icons/gi";
import {FaSearch} from "react-icons/fa";
import {IoCartOutline} from "react-icons/io5";
import {IoIosArrowDown} from "react-icons/io";
import {useCart} from "@/app/contexts/CartContext";

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { cartItems, getTotalPrice } = useCart();
    const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
    const totalPrice = getTotalPrice() || 0;

    return (
        <nav className="flex flex-col md:flex-row justify-between items-center px-6 bg-secondary pb-2">
            {/*left*/}
            <div className="flex sm:justify-center justify-between w-full md:w-auto">
                <div className="md:hidden px-4 bg-button1 rounded-xl items-center flex">
                    <GiHamburgerMenu size={22} />
                </div>
                <div className="flex items-center rounded-xl overflow-hidden w-full max-w-xs md:max-w-md">
                    <input type="text" placeholder="Search..."
                           className="py-1 px-2 h-fit outline-none flex-1"/>
                    <button className="p-2 bg-button1 hover:bg-gray-300">
                        <FaSearch/>
                    </button>
                </div>
            </div>

            {/*middle*/}
            <div className="flex justify-between items-center w-full md:w-auto mb-2 md:mb-0">
                <div className="flex items-center hover:scale-105 transition">
                    <Link href="/">
                        <Image
                            src={Logo}
                            alt="logo"
                            width={280}
                        />
                    </Link>
                </div>
                <div className="flex items-center gap-4 md:hidden">
                    <UserAuth />
                    <div className="relative">
                        <div className="flex items-center gap-2 bg-button2 p-2 rounded-xl cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <IoCartOutline size={22} />
                            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">{cartItemCount}</span>
                            <IoIosArrowDown className="bg-button2 p-1 rounded-full hover:bg-button1" />
                        </div>
                        <CartDropdown open={dropdownOpen} />
                    </div>
                </div>
            </div>

            {/*right*/}
            <div className="hidden md:flex items-center gap-4">
                <UserAuth />
                <div className="relative">
                    <div className="flex items-center gap-2 bg-button2 p-2 rounded-xl cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <IoCartOutline size={22} />
                        <span>{totalPrice.toFixed(2)} Kč</span>
                        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">{cartItemCount}</span>
                        <IoIosArrowDown className="bg-button2 p-1 rounded-full hover:bg-button1" />
                    </div>
                    <CartDropdown open={dropdownOpen} />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
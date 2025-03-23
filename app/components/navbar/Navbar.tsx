import React from 'react';
import Logo from '../../../public/logo.jpg'
import Image from "next/image";
import UserAuth from "@/app/components/navbar/UserAuth";
import Link from "next/link";
import CartDropdown from "@/app/components/navbar/dropdown/CartDropdown";
import {GiHamburgerMenu} from "react-icons/gi";
import {FaSearch} from "react-icons/fa";

function Navbar() {
    return (
        <nav className="flex flex-col md:flex-row justify-between items-center p-2 border bg-secondary">
            {/*top*/}
            <div className="flex justify-between items-center w-full md:w-auto mb-2 md:mb-0">
                <div className="flex items-center">
                    <Link href="/">
                        <Image
                            src={Logo}
                            alt="logo"
                            width={64}
                            height={64}
                        />
                    </Link>
                </div>
                <div className="flex items-center gap-4 md:hidden">
                    <UserAuth />
                    <CartDropdown />
                </div>
            </div>

            {/*middle*/}
            <div className="flex-1 flex sm:justify-center justify-between w-full md:w-auto">
                <div className="md:hidden px-4 bg-button1 rounded-xl items-center flex">
                    <GiHamburgerMenu size={22} />
                </div>
                <div className="flex items-center border rounded-xl overflow-hidden w-full max-w-xs md:max-w-md">
                    <input type="text" placeholder="Search..."
                           className="py-0.5 px-2 h-fit outline-none flex-1"/>
                    <button className="p-2 bg-button1 hover:bg-gray-300">
                        <FaSearch/>
                    </button>
                </div>
            </div>

            {/*right*/}
            <div className="hidden md:flex items-center gap-4">
                <UserAuth />
                <CartDropdown />
            </div>
        </nav>
    );
}

export default Navbar;
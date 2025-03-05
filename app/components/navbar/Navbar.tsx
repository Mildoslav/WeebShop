import React from 'react';
import Logo from '../../../public/logo.jpg'
import Image from "next/image";
import Dropdown from "@/app/components/navbar/dropdown/Dropdown";
import UserAuth from "@/app/components/navbar/UserAuth";
import Link from "next/link";
import CartDropdown from "@/app/components/navbar/dropdown/CartDropdown";
import {GiHamburgerMenu} from "react-icons/gi";
import {FaSearch} from "react-icons/fa";

function Navbar() {
    return (
        <nav className="flex justify-end sm:justify-between align-middle p-2 border px-2 bg-secondary
         ">
            {/*left*/}
            <div className="hidden md:block">
                <Link href="/">
                    <Image
                        src={Logo}
                        alt="logo"
                        width={64}
                        height={64}
                    />
                </Link>
            </div>
            <div className="flex sm:hidden justify-start">
                <FaSearch/>
            </div>

            {/*middle*/}
            <div className="items-center gap-4 w-full md:w-auto hidden sm:flex">
                <input type="text" placeholder="Co chces mrtko?"
                       className="py-0.5 px-2 h-fit outline-none border rounded-xl
                                  hover:border-b-4 hover:border-fuchsia-500
                                  placeholder:text-black
                                  flex-1 md:w-64
                                  "/>
            </div>

            {/*right*/}
            <div className="flex justify-between align-middle gap-5 pr-3">

                <div className="hidden md:flex items-center relative">
                    <Dropdown/>
                </div>

                <div className="flex items-center gap-4">
                    <UserAuth/>
                </div>

                <div className="flex items-center z-50">
                    <CartDropdown/>
                </div>

                <div className="block sm:hidden content-center ">
                    <GiHamburgerMenu size={22}/>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;

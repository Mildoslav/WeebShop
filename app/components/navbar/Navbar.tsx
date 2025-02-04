import React from 'react';
import Logo from '../../../public/logo.jpg'
import Image from "next/image";
import Dropdown from "@/app/components/navbar/Dropdown";
import UserLogin from "@/app/components/navbar/UserLogin";
import Link from "next/link";
import CartDropdown from "@/app/components/navbar/CartDropdown";

function Navbar() {
    return (
        <nav className="flex justify-between align-middle p-2 border px-12">
            {/*left*/}
            <div>
                <Link href="/">
                <Image
                    src={Logo}
                    alt="logo"
                    width={64}
                    height={64}
                />
                </Link>
            </div>

            {/*middle*/}
            <div className="flex items-center">
                <input type="text" placeholder="Co chces mrtko?"
                       className="py-0.5 px-2 h-fit outline-none border rounded-xl
                                  hover:border-b-4 hover:border-fuchsia-500
                                  placeholder:text-black
                                  "/>
            </div>

            {/*right*/}
            <div className="flex justify-between align-middle gap-5 pr-3">

                <div className="group flex items-center relative">
                    <Dropdown />
                </div>

                <div className="flex items-center">
                    <UserLogin />
                </div>

                <div className="flex items-center">
                    <CartDropdown />
                </div>

            </div>
        </nav>
    );
}

export default Navbar;
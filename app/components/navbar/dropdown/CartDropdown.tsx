"use client"
import React, {useState} from 'react';
import {IoCartOutline} from "react-icons/io5";
import Link from "next/link";

function CartDropdown() {
    const [open, setOpen] = useState(false)

    return (
        <div onClick={() => setOpen(!open)}
             className="relative cursor-pointer">
            <div className="flex items-center">
                <IoCartOutline size={28}/>
                <div className="pl-1 hidden sm:block">Kč 0,00</div>
            </div>
            <ul className={`${open ? "block" : "hidden"} absolute bg-amber-50 text-black px-2 py-2 mt-2 rounded-lg shadow-xl -translate-x-[50%]`}>
                <li className="text-center">tricko</li>
                <Link href="/kosik">
                    <li className="text-center">Kosik</li>
                </Link>
            </ul>
        </div>
    );
}

export default CartDropdown;

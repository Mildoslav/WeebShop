"use client"
import React, {useState} from 'react';
import {IoCartOutline} from "react-icons/io5";

function CartDropdown() {
    const [open, setOpen] = useState(false)

    return (
        <div onMouseEnter={() => setOpen(true)}
             onMouseLeave={() => setOpen(false)}
             className="relative cursor-pointer p-4">
            <div>
                <IoCartOutline
                size={28}
                />
            </div>
            <ul className={`${open ? "block" : "hidden"} absolute bg-amber-50 text-black px-2 py-2 mt-2 rounded-lg shadow-xl -translate-x-[50%]`}>
                <li className="text-center">tricko</li>
                <li className="text-center">analni kolik</li>
            </ul>
        </div>
    );
}

export default CartDropdown;
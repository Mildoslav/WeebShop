"use client"
import React, {useState} from 'react';
import {HiMiniLanguage} from "react-icons/hi2";

function Dropdown() {
    const [open, setOpen] = useState(false)

    return (
        <div className="relative cursor-pointer">
            <div onClick={() => setOpen(!open)}>
                <HiMiniLanguage
                size={28}
                />
            </div>
            <ul className={`${open ? "block" : "hidden"} absolute bg-amber-50 text-black px-2 py-2 mt-2 rounded-lg shadow-xl -translate-x-[50%]`}>
                    <li className="text-center">seski</li>
                    <li className="text-center">slovenski</li>
            </ul>
        </div>
    );
}

export default Dropdown;
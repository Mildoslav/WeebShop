import React from 'react';
import Link from "next/link";
import {GiHamburgerMenu} from "react-icons/gi";


function CategoryNavbar() {
    return (
        <div className='flex justify-center align-middle p-2 border px-12 gap-3 bg-light'>
            <div className="hover:bg-primary">
                <Link href={"/"}>
                    Akce
                </Link>
            </div>

            <div className="hover:bg-primary">
                <Link href={"/"}>
                    Výprodej
                </Link>
            </div>

            <div className="hover:bg-primary">
                <Link href={"/"}>
                    Kategorie
                </Link>
            </div>

            <div className="hover:bg-primary">
                <Link href={"/"}>
                    Anime
                </Link>
            </div>

            <div className="hover:bg-primary">
                <Link href={"/"}>
                    Bižuterie
                </Link>
            </div>

            <div className="hover:bg-primary">
                <Link href={"/"}>
                    <GiHamburgerMenu size={22}/>
                </Link>
            </div>
        </div>
    );
}

export default CategoryNavbar;
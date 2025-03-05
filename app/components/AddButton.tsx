"use client"
import React from 'react';
import {MdAddShoppingCart} from "react-icons/md";


function AddButton() {
    return (
        <div className="bg-primary rounded-xl">
            <button className="p-1">
                <MdAddShoppingCart size={28}/>
            </button>
        </div>
    );
}

export default AddButton;
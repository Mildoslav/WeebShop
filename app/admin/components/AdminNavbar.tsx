// app/admin/components/AdminNavbar.tsx
"use client";
import React from 'react';
import {signOut} from "next-auth/react";

function AdminNavbar() {
    return (
        <nav className="bg-secondary p-4 flex justify-end">
            <button onClick={() => signOut()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Sign Out
            </button>
        </nav>
    );
}

export default AdminNavbar;
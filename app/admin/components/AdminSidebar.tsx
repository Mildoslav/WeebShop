// app/admin/components/AdminSidebar.tsx
"use client";
import React from 'react';
import Link from "next/link";

function AdminSidebar() {
    return (
        <aside className="w-64 bg-secondary p-4">
            <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
            <ul>
                <li className="mb-2">
                    <Link href="/admin/orders" className="block hover:bg-gray-200 p-2 rounded">Orders</Link>
                </li>
                <li className="mb-2">
                    <Link href="/admin/products" className="block hover:bg-gray-200 p-2 rounded">Products</Link>
                </li>
            </ul>
        </aside>
    );
}

export default AdminSidebar;
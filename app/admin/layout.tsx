// app/admin/layout.tsx
import React from 'react';
import AdminSidebar from "@/app/admin/components/AdminSidebar";
import AdminNavbar from "@/app/admin/components/AdminNavbar";

interface AdminLayoutProps {
    children: React.ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="flex min-h-screen">
            <>
                <AdminSidebar/>
            </>
            <main className="flex-1 p-4">
                <AdminNavbar />
                {children}
            </main>
        </div>
    );
}

export default AdminLayout;
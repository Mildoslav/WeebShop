// app/admin/orders/page.tsx
import React from 'react';
import AdminLayout from "@/app/admin/layout";

function OrdersPage() {
    return (
        <AdminLayout>
            <div className="p-4">
                <h1 className="text-3xl font-bold">Orders</h1>
                {/* Add your orders list here */}
            </div>
        </AdminLayout>
    );
}

export default OrdersPage;
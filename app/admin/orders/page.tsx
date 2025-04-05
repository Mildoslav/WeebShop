'use client'

import React, {useEffect} from 'react';
import AdminLayout from "@/app/admin/layout";

function OrdersPage() {

    const [orders, setOrders] = React.useState([]);
    const [page, setPage] = React.useState(1);

    useEffect(() => {
        updateDate()
    }, []);

    useEffect(() => {
        updateDate()
    }, [page]);

    async function updateDate() {
        const query = new URLSearchParams({
            page: page
        });

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/order?${query}`, {
            cache: 'no-store',
            method: "GET",
        });

        const data = await res.json();
        setOrders(data.orders);
    }

    return (
        <AdminLayout>
            <div className="p-4">
                <h1 className="text-3xl font-bold">Orders</h1>
                <div className="overflow-x-auto mt-4">
                    {orders.length === 0 ? (
                        <p className="text-gray-600">No orders found.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {orders.map((order: any) => (
                                <div key={order._id} className={`shadow-md rounded px-8 pt-6 pb-8 mb-4 ${
                                    order.orderState === 'shipment' ? 'bg-red-300 text-black' :
                                        order.orderState === 'payment' ? 'bg-yellow-300 text-black' :
                                            order.orderState === 'completed' ? 'bg-green-300 text-black' :
                                                order.orderState === 'canceled' ? 'bg-gray-300 text-black' : ''
                                }`}>
                                    <h2 className="text-xl font-bold">Order for: {order.fullName}</h2>
                                    <h3 className="text-lg font-semibold">State: {order.orderState}</h3>
                                    <h3 className="text-lg font-semibold">Payment method: {order.paymentMethod}</h3>
                                    <h3 className="text-lg font-semibold">Price: {order.price} Kč</h3>
                                    <h3 className="text-lg font-semibold">Address: {order.address}</h3>
                                    <h3 className="text-lg font-semibold">City: {order.city}</h3>
                                    <h3 className="text-lg font-semibold">Postal code: {order.postalCode}</h3>
                                    <h3 className="text-lg font-semibold">Cart items:</h3>
                                    <ul className="list-disc list-inside">
                                        {order.cartItems.map((item: any) => (
                                            <li key={item._id}
                                                className="text-gray-700">{item.name} - {item.price} Kč</li>
                                        ))}
                                    </ul>
                                    <h3 className="text-lg font-semibold">Created
                                        at: {new Date(order.createdAt).toLocaleString()}</h3>
                                    <h3 className="text-lg font-semibold">Updated
                                        at: {new Date(order.updatedAt).toLocaleString()}</h3>
                                    <h3 className="text-lg font-semibold">User ID: {order.user}</h3>
                                    <h3 className="text-lg font-semibold">Payment state: {order.paymentState}</h3>
                                    <h3 className="text-lg font-semibold">Is
                                        shipped: {order.isShipped ? "Yes" : "No"}</h3>
                                    <h3 className="text-lg font-semibold">Order
                                        date: {new Date(order.orderDate).toLocaleString()}</h3>
                                    <h3 className="text-lg font-semibold">Payment
                                        date: {new Date(order.paymentDate).toLocaleString()}</h3>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex justify-between mt-4">
                        <button onClick={() => setPage(page - 1)} disabled={page === 1}
                                className="bg-blue-500 text-white px-4 py-2 rounded">Previous
                        </button>
                        <button onClick={() => setPage(page + 1)} disabled={orders.length < 10}
                                className="bg-blue-500 text-white px-4 py-2 rounded">Next
                        </button>
                        <p className="text-gray-600">Page {page}</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default OrdersPage;
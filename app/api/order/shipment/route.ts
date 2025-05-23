import {connectDB} from "@/lib/mongodb";
import Order from "@/lib/models/Order";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import {cookies} from "next/headers";

export async function POST(req: Request): Promise<Response> {
    const cookieStore = await cookies()

    try {
        await connectDB();
        const data = await req.json();

        const session = await getServerSession(authOptions);

        const order = await Order.create({
            orderState: "shipment",
            user: session?._id,
            fullName: data.fullName,
            address: data.address,
            city: data.city,
            postalCode: data.postalCode,
            cartItems: data.cartItems,
            price: data.price,
        });

        // save order to cookie
        cookieStore.set('order', order._id);

        return Response.json(
            {message: 'Order created successfully', order},
            {status: 200}
        );
    } catch (error) {
        console.error("Error creating product:", error);
        return Response.json(
            {message: 'Error creating product: ' + error},
            {status: 500}
        );
    }
}


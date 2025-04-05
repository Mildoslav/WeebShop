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
        const order = cookieStore.get('order');

        await Order.updateOne(
            {_id: order.value},
            {
                orderState: "payment",
                paymentMethod: data.paymentMethod,
                orderDate: new Date(),
            }
        );

        return Response.json(
            {message: 'Order updated successfully'},
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


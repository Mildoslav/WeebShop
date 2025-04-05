import {connectDB} from "@/lib/mongodb";
import Order from "@/lib/models/Order";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";

export async function POST(req: Request): Promise<Response> {
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
        });

        console.log("Order created:", order);

        return Response.json({message: 'Product created'}, {status: 201});
    } catch (error) {
        console.error("Error creating product:", error);
        return Response.json(
            {message: 'Error creating product: ' + error},
            {status: 500}
        );
    }
}


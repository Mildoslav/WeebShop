import {NextResponse} from "next/server";
import {connectDB} from "@/lib/mongodb";
import Order from "@/lib/models/Order";

export async function GET(req: Request): Promise<Response> {
    // todo : add authentication

    try {
        await connectDB();

        const searchParams = req.nextUrl.searchParams
        const page = Number(searchParams.get('page')) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const orders = await Order.find().skip(offset).limit(limit);

        return NextResponse.json(
            {
                message: 'Orders fetched successfully',
                orders,
            },
            {status: 200}
        );
    } catch (error) {
        console.error("Error fetching products:", error);
        return Response.json(
            {message: 'Error fetching products: ' + error},
            {status: 500}
        );
    }
}
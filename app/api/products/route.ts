import {connectDB} from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import {NextRequest, NextResponse} from "next/server";


export async function POST(req: Request): Promise<Response> {
    try {
        await connectDB();
        const data = await req.json();

        const product = await Product.create(data);

        return Response.json({ message: 'Product created', product }, { status: 201 });
    } catch (error) {
        return Response.json(
            { message: 'Error creating product' + error },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    try {
        await connectDB();
        const products = await Product.find();
        return NextResponse.json({ products }, { status: 200 }); // Use object notation for clarity
    } catch (error) {
        console.error("Error fetching products:", error); // Log the error for debugging
        return new NextResponse(JSON.stringify({ message: `Error fetching products: ${error}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

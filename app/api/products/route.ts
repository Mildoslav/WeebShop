import {connectDB} from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export async function GET(req: Request): Promise<Response> {
    try {
        await connectDB();
        const products = await Product.find({});
        return Response.json(products, { status: 200 });
    } catch (error) {
        console.error("Error fetching products:", error);
        return Response.json(
            { message: 'Error fetching products: ' + error },
            { status: 500 }
        );
    }
}


export async function POST(req: Request): Promise<Response> {
    try {
        await connectDB();
        const data = await req.json();

        const product = await Product.create(data);

        return Response.json({ message: 'Product created', product }, { status: 201 });
    } catch (error) {
        console.error("Error creating product:", error);
        return Response.json(
            { message: 'Error creating product: ' + error },
            { status: 500 }
        );
    }
}


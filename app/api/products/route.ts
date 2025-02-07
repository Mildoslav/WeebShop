import {connectDB} from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export async function POST(req: Request) : Promise<Response> {
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

export async function GET(req: any, res: any) {
    console.log(res);
}

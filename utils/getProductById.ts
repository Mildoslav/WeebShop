import {connectDB} from "@/lib/mongodb";
import Product from "@/lib/models/Product";

export async function getProductById(id: string) {
    try {
        await connectDB();
        const product = await Product.findById(id);
        if (!product) {
            console.error("Product not found");
            return null;
        }
        return product;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
}

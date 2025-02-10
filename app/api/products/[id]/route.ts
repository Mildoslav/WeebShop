import {connectDB} from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import {NextRequest, NextResponse} from "next/server";
import mongoose from "mongoose"; // Import mongoose

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        const { id } = params;

        // Basic ID validation (check if it's a valid MongoDB ObjectId)
        if (!mongoose.isValidObjectId(id)) {
            return NextResponse.json({ message: "Invalid Product ID" }, { status: 400 });
        }

        const {
            name,
            description,
            sizes,
            price,
            image,
        } = await req.json();

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                name,
                description,
                sizes,
                price,
                image,
            },
            { new: true, runValidators: true } // Options: return updated doc & run schema validations
        );

        if (!updatedProduct) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Product Updated", product: updatedProduct },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating product:", error); // Log the full error for debugging

        if (error instanceof mongoose.Error.ValidationError) {
            // Mongoose validation error (e.g., required fields missing)
            const errors = Object.values(error.errors).map((err) => err.message);
            return NextResponse.json({ message: "Validation error", errors }, { status: 400 });
        } else if (error instanceof mongoose.Error.CastError) {
            // CastError:  usually means the ID is not in the correct format
            return NextResponse.json({ message: "Invalid Product ID format" }, { status: 400 });
        }

        return NextResponse.json(
            { message: "Error updating product", error },
            { status: 500 }
        ); // Include error message in response
    }
}
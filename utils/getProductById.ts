import mongoose from 'mongoose';
import {Product} from "./types";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}


let cachedDb: typeof mongoose | null = null;

export const connectDB = async () => {
    if (cachedDb) {
        return cachedDb;
    }

    try {
        if (mongoose.connection.readyState === 0) {
            const db = await mongoose.connect(MONGODB_URI);
            cachedDb = db;
            console.log('Connected to MongoDB');
            return db;
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};


export const getProductById = async (id: string): Promise<Product | null> => {

    try {
        await connectDB();
        // @ts-ignore
        const product = await Product.findById(id);
        if (!product) {
            console.log(`No product found with ID ${id}`);
            return null;
        }
        return product;
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        return null;
    }
};


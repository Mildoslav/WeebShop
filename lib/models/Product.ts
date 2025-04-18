import mongoose, {model, Schema} from "mongoose";

export interface ProductDocument {
    name: string;
    description: string;
    sizes: string[];
    price: number;
    image: string;
}

const ProductSchema = new Schema<ProductDocument>({
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        sizes: {
            type: [String],
            required: true
        },
        price: {
            type: Number,
            required: false,
        },
        image: {
            type: String,
            required: true,
        },
        moreImages: {
            type: [String],
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const  Product  =  mongoose.models?.Product  ||  model<ProductDocument>('Product', ProductSchema);
export  default  Product;
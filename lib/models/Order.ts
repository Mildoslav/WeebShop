import mongoose, {model, Schema} from "mongoose";

export interface OrderDocument {
    orderState: string;
    user: string;
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    paymentMethod: string;
    cartItems: {
        todo: string;
    },
    price: number;
    paymentState: string;
    orderDate: Date;
    paymentDate: Date;
    isShipped: boolean;
}

const OrderSchema = new Schema<OrderDocument>({
        orderState: {
            type: String,
            default: "pending",
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        fullName: {
            type: String,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        postalCode: {
            type: Number,
        },
        paymentMethod: {
            type: String,
        },
        cartItems: [
            {
                id: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                },
                name: {
                    type: String,
                },
                image: {
                    type: String,
                },
                price: {
                    type: Number,
                },
                quantity: {
                    type: Number,
                }
            }
        ],
        price: {
            type: Number,
        },
        paymentState: {
            type: String,
            default: "pending"
        },
        orderDate: {
            type: Date
        },
        paymentDate: {
            type: Date
        },
        isShipped: {
            type: Boolean
        }
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.models?.Order || model<OrderDocument>('Order', OrderSchema);
export default Order;
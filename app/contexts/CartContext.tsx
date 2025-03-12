"use client";
import {createContext, ReactNode, useContext, useState} from "react";

interface CartItem {
    productId: string;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (productId: string) => void;
    removeFromCart: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (productId: string) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.productId === productId);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { productId, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart musí být použit uvnitř CartProvider");
    }
    return context;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    sizes: string[]
    price: number;
    image: string;
}

export interface Theme {
    id: number
    name: string;
    image: string;
}
import { Timestamp } from "firebase/firestore";

export interface Store{
    id: string;
    name: string;
    userId: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface Billboards{
    id: string,
    label: string,
    imageUrl: string,
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface Categories {
    id: string,
    billboardId: string,
    billboardLabel: string,
    name: string,
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface Sizes{
    id: string,
    value: string,
    name: string,
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface Kitchen{
    id: string,
    value: string,
    name: string,
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface Cuisines{
    id: string,
    value: string,
    name: string,
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface Product{
    id: string,
    name: string,
    price: number,
    qty?: number,
    images: { url: string }[],
    isFeatured: boolean,
    isArchived: boolean,
    category: string,
    size: string,
    kitchen: string,
    cuisine: string,
    createdAt: Timestamp,
    updatedAt: Timestamp,
}

export interface Order {
    id: string,
    isPaid: boolean,
    phone: string,
    orderItem: Product[],
    address: string,
    orderStatus: string,
    createdAt: Timestamp,
    updatedAt: Timestamp,
}
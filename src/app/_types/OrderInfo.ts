import {History} from "@/app/_types/TeethOptions";

export default interface OrderInfo {
    config: {
        id: number,
        config: History,
        screen: string|undefined|null
    },
    created_at: Date,
    id: number,
    shipping: boolean,
    total: number,
    shippingAddress: {
        address: string,
        city: string,
        email: string,
        lastname: string,
        name: string,
        phone: string,
        postalCode: string,
        state: string
    },
    status: 'In production' | 'Shipped' | 'Delivered' | 'New' | 'Canceled' | undefined,
    order_id: number,
    user_id: {
        id: number,
        email: string,
        lastname: string,
        name: string,
        phone: string,
        scan: string|undefined|null
    },
}
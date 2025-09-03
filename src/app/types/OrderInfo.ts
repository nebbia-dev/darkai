import {History} from "@/app/types/State";

export default interface OrderInfo {
    config: {
        id: number,
        config: History,
        screen: string|undefined|null
    },
    created_at: Date,
    id: number,
    shipping: boolean,
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
    status: 'In preparation' | 'Shipped' | 'Picked Up' | 'Ready' | 'Canceled' | undefined,
    user_id: {
        id: number,
        email: string,
        lastname: string,
        name: string,
        phone: string,
        scan: string|undefined|null
    },
}
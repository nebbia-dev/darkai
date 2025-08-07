import {History} from "@/app/types/State";

export default interface OrderInfo {
        config: {
            id: number,
            config: History
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
    status: 'Prepping' | 'Sent' | 'Completed' | 'Canceled',
    user_id: {
        email: string,
        lastname: string,
        name: string,
        phone: string
    },
}
import {History} from "@/app/_types/TeethOptions";
import PersonalData from "@/app/_types/PersonalData";

export default interface OrderInfo {
    config_id: {
        id: number,
        config: History,
        screen: string|undefined|null
    },
    created_at: Date,
    id: number,
    shipping: boolean,
    total: number,
    shippingAddress: PersonalData,
    status: 'Pending payment' | 'In production' | 'Shipped' | 'Delivered' | 'New' | 'Canceled' | undefined,
    user_id: {
        id: number,
        email: string,
        lastname: string,
        name: string,
        phone: string,
        scan: string|undefined|null
    },
}

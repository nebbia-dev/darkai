import {History} from "@/app/types/State";

export default interface ConfigInfo {
    config: History
    config_id: number,
    created_at: Date,
    id: number,
    orderStatus: string,
    screen: string,
    total: number
}
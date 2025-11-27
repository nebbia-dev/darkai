import {History} from "@/app/_types/TeethOptions";

export default interface ConfigInfo {
    config: History
    config_id: number,
    created_at: Date,
    id: number,
    orderStatus: string,
    screen: string,
    total: number
}
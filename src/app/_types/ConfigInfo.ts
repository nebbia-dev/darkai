import {History, Packaging} from "@/app/_types/TeethOptions";

export default interface ConfigInfo {
    config: History
    created_at: Date,
    id: number,
    orderStatus: string,
    screen: string,
    total: number,
    config_pack: Packaging
}
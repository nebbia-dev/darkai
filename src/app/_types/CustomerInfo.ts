import PersonalData from "@/app/_types/PersonalData";

export default interface CustomerInfo {
    created_at: Date,
    id: number,
    total: number,
    user_id: PersonalData,
}
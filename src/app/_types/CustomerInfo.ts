export default interface CustomerInfo {
    created_at: Date,
    id: number,
    total: number,
    user_id: {
        lastname: string,
        name: string,
        city: string,
        postalCode: string,
        state: string,
        email: string
    },
}
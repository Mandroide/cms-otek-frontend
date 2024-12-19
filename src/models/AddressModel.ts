export interface AddressRequest {
    id: number,
    street: string,
    city: string,
    zip_code: string,
    customer_id: number
}

export interface AddressResponse {
    id: number,
    street: string,
    city: string,
    zip_code: string,
    customer_id: number
}
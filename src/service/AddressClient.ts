import {apiClient} from "./httpConfig";
import {AddressResponse} from "../models/AddressModel.ts"
import {AxiosResponse} from "axios";

export const saveAddress = (formData: FormData): Promise<AddressResponse> => {
    return apiClient.post("/addresses/", formData).then((value: AxiosResponse<AddressResponse>) => {
        if (value.status !== 201) {
            throw new Error(`Unexpected response code: ${value.status}`)
        }
        return value.data
    }).catch((reason) => {
        throw reason;
    });
};

export const getAddressses = (): Promise<AddressResponse[]> =>
    apiClient.get(`/addresses/`)
        .then((value: AxiosResponse<AddressResponse[]>) => {
            if (value.status !== 200) {
                throw new Error(`Unexpected response code: ${value.status}`)
            }
            return value.data;
        });

export const editAddress = (id: number, formData: FormData): Promise<AddressResponse> => {
    return apiClient.put(`/addresses/${id}/`, formData)
        .then((value: AxiosResponse<AddressResponse>) => {
            if (value.status !== 200) {
                throw new Error(`Unexpected response code: ${value.status}`)
            }
            return value.data;
        })

}

export const deleteAddress = (id: number): Promise<void> => {
    return apiClient.delete(`/addresses/${id}/`)
        .then((value: AxiosResponse<AddressResponse>) => {
            if (value.status !== 204) {
                throw new Error(`Unexpected response code: ${value.status}`)
            }
        }).catch((reason) => {
            throw reason;
        });

}
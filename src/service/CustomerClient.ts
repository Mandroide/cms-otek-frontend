import {apiClient} from "./httpConfig";
import {CustomerResponse} from "../models/CustomerModel.ts"
import {AxiosResponse} from "axios";

export const saveCustomer = (formData: FormData): Promise<CustomerResponse> => {
    return apiClient.post("customers/", formData)
        .then((value: AxiosResponse<CustomerResponse>) => {
            if (value.status !== 201) {
                throw new Error(`Unexpected response code: ${value.status}`)
            }
            return value.data
        }).catch((reason) => {
            console.error(reason)
            throw reason;
        });
};

export const getCustomers = (): Promise<CustomerResponse[]> => {
    return apiClient.get(`customers/`)
        .then((value) => {
            return value.data
        }).catch(reason => {
            throw reason;
        });
}


export const getCustomer = (id: number): Promise<CustomerResponse> => {
    return apiClient.get(`customers/${id}/`)
        .then((value: AxiosResponse<CustomerResponse>) => {
            if (value.status !== 200) {
                throw new Error(`Unexpected response code: ${value.status}`)
            }
            return value.data
        }).catch((reason) => {
            throw reason;
        });

}

export const editCustomer = (id: number, formData: FormData): Promise<CustomerResponse> => {
    return apiClient.put(`customers/${id}/`, formData)
        .then((value: AxiosResponse<CustomerResponse>) => value.data)
        .catch(reason => {
            console.error(reason)
            throw reason;
        })

}

export const deleteCustomer = (id: number): Promise<void> => {
    return apiClient.delete(`customers/${id}/`)
        .then((value: AxiosResponse<void>) => {
            if (value.status !== 204) {
                throw new Error(`Unexpected response code: ${value.status}`)
            }
        }).catch((reason) => {
            throw reason;
        });

}

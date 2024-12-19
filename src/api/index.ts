/* eslint-disable no-useless-catch */
import {editCustomer, saveCustomer} from "../service/CustomerClient.ts";
import {editAddress, saveAddress} from "../service/AddressClient.ts";

/**
 *
 * @param {*} data An array of objects
 * @returns this function create a client
 */
export const createCustomer = async (data: any) => {
    const {first_name, last_name, phone, email, birth_date} = data
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('email', email);
    formData.append('phone', `${phone}`);
    formData.append('birth_date', `${birth_date}`);
    try {
        const customerResponse = await saveCustomer(formData)
        const customerId = customerResponse.id;
        if (customerId) {
            createAddresses(data, customerId)
        }
        return customerResponse;
    } catch (error) {
        console.log(error);
    }

}
/**
 *
 * @param {*} data the new data
 * @param {*} id the client id
 * @returns cUpdate an existing client in the database
 */
// @ts-expect-error
export const updateCustomer = async (data: any, id: number) => {
    const {first_name, last_name, phone, email, birth_date} = data
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('email', email);
    formData.append('phone', `+${phone}`);
    formData.append('birth_date', `+${birth_date}`);

    try {
        const customerResponse = await editCustomer(id, formData)
        const customerId = customerResponse.id;
        if (customerId) {
            updateAddresses(data, customerId)
        }
        return customerResponse;
    } catch (error) {
        console.log(error);
    }
}

/**
 *
 * @param {*} data The addresses
 * @param {*} customerId The customer id
 * @returns Create a new (few) addresses in the database
 */
export const createAddresses = (data: any, customerId: number) => {
    const addresses = data.addresses;

    addresses.map((address) => {
        const formData = new FormData();
        formData.append('street', address.street)
        formData.append('city', address.city)
        formData.append('zip_code', address.zip_code)
        formData.append('customer', `${customerId}`)
        return saveAddress(formData)
    })
}

/**
 *
 * @param {*} data The new address data
 * @param {*} customerId
 */
const updateAddresses = async (data, customerId: number) => {
    const addresses = await data.addresses;

    addresses.map((address) => {
        if (address.addressId) {
            const formData = new FormData();
            formData.append('id', address.addressId)
            formData.append('street', address.street)
            formData.append('city', address.city)
            formData.append('zip_code', address.zip_code)
            formData.append('customer', `${address.customer_id}`)
            editAddress(address.addressId, formData)
        } else {
            createAddresses({
                'addresses': [{
                    'id': address.addressId,
                    'street': address.street,
                    'city': address.city,
                    'zip_code': address.zip_code,
                    'customer': customerId
                }]
            }, customerId)
        }
    })

}
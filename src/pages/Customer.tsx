import CustomerList from "../components/CustomerList.tsx";
import {useEffect, useState} from "react";
import {getCustomers} from "../service/CustomerClient.ts";
import {CustomerResponse} from "../models/CustomerModel.ts";

const Customer = ({setId}) => {
    const [customers, setCustomers] = useState<CustomerResponse[]>([]);
    useEffect(() => {
        async function fetchCustomers() {
            const response = await getCustomers();
            setCustomers(response)
        }

        fetchCustomers();
    }, []);
    setId(0)
    return (
        <CustomerList customers={customers}/>
    )
}


export default Customer

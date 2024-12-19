import {CustomerResponse} from "../models/CustomerModel"
import OutlinedCard from "./Card.tsx";

export interface CustomerProps {
    customers: CustomerResponse[]
}

const CustomerList = (props: CustomerProps) => {
    return (
        <section className="customerSection">
            {props.customers.map((customer) => (
                <OutlinedCard
                    key={customer.id}
                    customer={customer}
                />
            ))}
        </section>
    );
}

export default CustomerList;
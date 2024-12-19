import {useForm, useFieldArray} from 'react-hook-form'
import Input from '../components/Input'
import {Button} from '@mui/material'
import {useNavigate, useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {AddressResponse} from "../models/AddressModel.ts";
import {deleteAddress, getAddressses} from "../service/AddressClient.ts";
import {getCustomer} from "../service/CustomerClient.ts";
import {createCustomer, updateCustomer} from "../api";
import {PATHS} from "../constants/routes.ts";


const Form = (props: Readonly<{ setId: (id: number) => void }>) => {
    const [error, setError] = useState<string>()
    const {id} = useParams()
    const [addresses, setAddresses] = useState<AddressResponse[]>([]);
    useEffect(() => {
        async function fetchAddresses() {
            const response = await getAddressses();
            setAddresses(response)
        }

        fetchAddresses();
    }, []);
    const navigate = useNavigate();
    const {register, handleSubmit, control, setValue, reset} = useForm();

    const {fields, append, remove} = useFieldArray({
        name: "addresses",
        control
    });

    useEffect(() => {
        setError('')

        async function loadTask() {
            if (id) {
                props.setId(+id)
                const response = await getCustomer(+id)
                setValue('first_name', response.first_name)
                setValue('last_name', response.last_name)
                setValue('email', response.email)
                setValue('phone', response.phone)
                setValue('birth_date', response.birth_date)
                const customerAddresses = addresses.filter(address => (address.customer_id + "") === id)
                reset({data: addresses})
                await Promise.all(customerAddresses.map(async address => {
                    append({
                        addressId: address.id,
                        street: address.street,
                        city: address.city,
                        zip_code: address.zip_code
                    });
                }));
            }
        }

        loadTask()
    }, [id, addresses])

    const deleteFunction = (id: number, index: number) => {
        if (id) {
            deleteAddress(id);
            remove(index);
        } else {
            remove(index);
        }
    };

    const onSubmit = handleSubmit(async (data) => {
        try {
            if (id) {
                await updateCustomer(data, +id);
            } else {
                await createCustomer(data);
            }
            setError('');
            navigate(PATHS.HOME);
        } catch (error) {
            // @ts-ignore
            const responseData = error.response.data;
            Object.keys(responseData).forEach(key => {
                setError(responseData[key])
            });
        }
    });

    return (
        <section className='formSection'>
            <h1>CREATE A NEW CUSTOMER</h1>
            <form action="" onSubmit={onSubmit}>
                <Input
                    name='first_name'
                    label='Name'
                    register={register}
                    type='text'
                />
                <Input
                    name='last_name'
                    label='Last Name'
                    register={register}
                    type='text'
                />
                <Input
                    name='email'
                    label='Email'
                    register={register}
                    type='email'
                />
                <Input
                    name='phone'
                    label='Phone'
                    register={register}
                    type='tel'
                />
                <Input
                    name='birth_date'
                    label='Birth date'
                    register={register}
                    type='date'
                />
                <h1>ADDRESS INFORMATION</h1>
                {fields.map((addresses, index) => {
                    return (
                        <div key={addresses.id}>
                            <Input
                                register={register}
                                index={index}
                                name='street'
                                label='Street'
                                type='text'
                                placeholder='123 Main Street'
                            />
                            <Input
                                register={register}
                                index={index}
                                name='city'
                                label='City'
                                type='text'
                                placeholder='Cityville'
                            />
                            <Input
                                register={register}
                                index={index}
                                name='zip_code'
                                label='Zip Code'
                                type='text'
                                placeholder='12345'
                            />
                            <Button className='deleteBtn' variant="contained" color='error' type='button'
                                    onClick={() => deleteFunction(+addresses.id, index)}>
                                Remove Address
                            </Button>
                        </div>

                    )
                })}

                <div className='createBtn'>
                    <Button variant="contained" type='button' onClick={() => append({})}>Add Address</Button>

                    <Button type='submit' variant="contained" color='success' onClick={onSubmit}>Save</Button>
                </div>
            </form>
            {error ?
                <div className='error'>
                    <h1>{error}</h1>
                </div>
                :
                <></>
            }
        </section>
    )
}


export default Form

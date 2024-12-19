import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import React from "react";

export interface InputProps {
    register: (a: string, b: { required: boolean }) => object,
    name: string,
    label: React.ReactNode,
    type?: React.HTMLInputTypeAttribute,
    index?: number,
    placeholder?: string
}

export default function Input(props: Readonly<InputProps>) {
    return (
        <TextField
            className='input'
            label={props.label}
            {...(props.index !== undefined ? props.register(`addresses.${props.index}.${props.name}`, {required: true}) : props.register(props.name, {required: true}))}
            type={props.type}
            slotProps={
                {
                    input: {
                        startAdornment: <InputAdornment position="start"></InputAdornment>,
                    }
                }
            }
            placeholder={props.placeholder ? props.placeholder : ''}

        />
    );
}

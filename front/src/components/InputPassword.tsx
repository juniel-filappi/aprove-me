import { InputText as PrimeInputText, InputTextProps } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { useState } from "react";

interface PropsPassword extends InputTextProps {
    label?: string;
    error?: string;
    loading?: number;
}

export function InputPassword(props: PropsPassword) {
    const [show, setShow] = useState(false);
    const type = show ? 'text' : 'password';
    const icon = show ? 'pi-eye-slash' : 'pi-eye';
    const isLoading = props.loading === 1;

    return (
        <div className="flex flex-col">
            {props.label && <label htmlFor={props.id} className="font-bold">{props.label}</label>}
            <IconField>
                <PrimeInputText
                    {...props}
                    className="w-full"
                    type={type}
                    invalid={!!props?.error}
                    disabled={isLoading || false}
                />
                {isLoading ?
                    (<InputIcon className="pi pi-spin pi-spinner" />) :
                    (<InputIcon className={`pi cursor-pointer ${icon}`} onClick={() => setShow(!show)} />)
                }
            </IconField>
            {props.error && <small className="text-red-400">{props.error}</small>}
        </div>
    )
}
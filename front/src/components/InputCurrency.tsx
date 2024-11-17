import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputNumber, InputNumberProps } from "primereact/inputnumber";

interface PropsInputCurrency extends InputNumberProps {
    label?: string;
    error?: string;
    loading?: number;
    required?: boolean;
}

export function InputCurrency(props: PropsInputCurrency) {
    const isLoading = props.loading === 1;

    const renderInput = () => {
        if (isLoading) {
            return (
                <IconField>
                    <InputNumber
                        {...props}
                        className="w-full"
                        invalid={!!props?.error}
                        disabled={true}
                    />
                    <InputIcon className="pi pi-spin pi-spinner" />
                </IconField>
            )
        }
        return (
            <InputNumber
                {...props}
                className="w-full"
                invalid={!!props?.error}
                disabled={isLoading || false}
            />
        )
    }

    return (
        <div className="flex flex-col">
            {props.label &&
                <label htmlFor={props.id} className="font-bold">
                    {props.label}
                    {props.required && <span className="text-red-400"> *</span>}
                </label>
            }
            {renderInput()}
            {props.error && <small className="text-red-400">{props.error}</small>}
        </div>
    )
}
import { InputText as PrimeInputText, InputTextProps } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

interface PropsInputText extends InputTextProps {
    label?: string;
    error?: string;
    loading?: number;
    required?: boolean;
}

export function InputText(props: PropsInputText) {
    const isLoading = props.loading === 1;

    const renderInput = () => {
        if (isLoading) {
            return (
                <IconField>
                    <PrimeInputText
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
            <PrimeInputText
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
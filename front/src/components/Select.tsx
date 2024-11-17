import { Dropdown, DropdownProps } from "primereact/dropdown";

interface PropsSelect extends DropdownProps {
    label?: string;
    error?: string;
    required?: boolean;
}

export function Select(props: PropsSelect) {
    return (
        <div className="flex flex-col">
            {props.label &&
                <label htmlFor={props.id} className="font-bold">
                    {props.label}
                    {props.required && <span className="text-red-400"> *</span>}
                </label>
            }
            <Dropdown
                {...props}
                className="w-full"
                invalid={!!props?.error}
            />
            {props.error && <small className="text-red-400">{props.error}</small>}
        </div>
    )
}
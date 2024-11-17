import { useFormik } from "formik";
import { InputCurrency } from "@/components/InputCurrency";
import { InputCalendar } from "@/components/InputCalendar";
import { Select } from "@/components/Select";
import { useAssignor } from "@/hooks/useAssignor";

interface IFormikProps {
    value: number;
    emissionDate: Date;
    assignorId: string;
}

interface IFormAssignorProps {
    loading?: boolean;
    formik: ReturnType<typeof useFormik<IFormikProps>>;
}

export default function FormPayable(props: IFormAssignorProps) {
    const { data } = useAssignor();

    return (
        <div className="grid grid-cols-2 gap-4 mt-5">
            <InputCurrency
                id="value"
                name="value"
                placeholder="Digite o valor"
                label="Valor"
                required
                currency="BRL"
                mode="currency"
                locale="pt-BR"
                maxLength={140}
                value={props.formik.values.value}
                onChange={(e) => props.formik.setFieldValue('value', e.value)}
                error={props.formik.errors.value}
                loading={props.loading ? 1 : 0}
            />
            <InputCalendar
                id="emissionDate"
                name="emissionDate"
                placeholder="Selecione a data de emissão"
                label="Data de Emissão"
                required
                value={props.formik.values.emissionDate}
                onChange={props.formik.handleChange}
                error={props.formik.errors.emissionDate as string}
                loading={props.loading ? 1 : 0}
            />
            <Select
                id="assignorId"
                name="assignorId"
                label="Cedente"
                required
                options={data}
                optionLabel="name"
                optionValue="id"
                placeholder="Selecione o cedente"
                value={props.formik.values.assignorId}
                onChange={props.formik.handleChange}
                error={props.formik.errors.assignorId}
                loading={props.loading}
            />
        </div>
    )
}
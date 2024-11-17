import { IAssignor } from "@/services/assignor/interface";
import { InputText } from "@/components/InputText";
import { useFormik } from "formik";

interface IFormAssignorProps {
    loading?: boolean;
    formik: ReturnType<typeof useFormik<Omit<IAssignor, 'id'>>>;
}

export default function FormAssignor(props: IFormAssignorProps) {
    return (
        <div className="grid grid-cols-2 gap-4 mt-5">
            <InputText
                id="name"
                name="name"
                placeholder="Digite o nome"
                label="Nome"
                required
                maxLength={140}
                value={props.formik.values.name}
                onChange={props.formik.handleChange}
                error={props.formik.errors.name}
                loading={props.loading ? 1 : 0}
            />
            <InputText
                id="email"
                name="email"
                placeholder="Digite o email"
                label="Email"
                type="email"
                required
                maxLength={140}
                value={props.formik.values.email}
                onChange={props.formik.handleChange}
                error={props.formik.errors.email}
                loading={props.loading ? 1 : 0}
            />
            <InputText
                id="document"
                name="document"
                placeholder="Digite o documento"
                label="Documento"
                keyfilter="num"
                required
                maxLength={30}
                value={props.formik.values.document}
                onChange={props.formik.handleChange}
                error={props.formik.errors.document}
                loading={props.loading ? 1 : 0}
            />
            <InputText
                id="phone"
                name="phone"
                placeholder="Digite o telefone"
                label="Telefone"
                type="tel"
                required
                maxLength={20}
                keyfilter="num"
                value={props.formik.values.phone}
                onChange={props.formik.handleChange}
                error={props.formik.errors.phone}
                loading={props.loading ? 1 : 0}
            />
        </div>
    )
}
import { date, number, object, string } from "yup";

export const createOrUpdatePayableSchema = object({
    value: number().required('O valor é obrigatório'),
    emissionDate: date().required('A data de emissão é obrigatória'),
    assignorId: string().required('O cedente é obrigatório')
})
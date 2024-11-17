import { object, string } from "yup";

export const loginSchemaValidation = object({
    email: string().email('Email inválido').required('Email é obrigatório'),
    password: string().required('Senha é obrigatória')
})
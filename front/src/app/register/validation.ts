import { object, string } from "yup";

export const registerSchemaValidation = object({
    name: string().required('Nome é obrigatório').max(255, 'Nome deve ter no máximo 255 caracteres'),
    email: string().required('Email é obrigatório').email('Email inválido'),
    password: string().required('Senha é obrigatória').min(6, 'Senha deve ter no mínimo 6 caracteres')
})
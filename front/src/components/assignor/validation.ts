import { object, string } from "yup";

export const createOrUpdateAssignorSchema = object({
    name: string().required('Nome é obrigatório').max(140, 'Nome deve ter no máximo 140 caracteres'),
    email: string().email('E-mail inválido').required('E-mail é obrigatório').max(140, 'E-mail deve ter no máximo 140 caracteres'),
    document: string().required('Documento é obrigatório').max(30, 'Documento deve ter no máximo 30 caracteres'),
    phone: string().required('Telefone é obrigatório').max(20, 'Telefone deve ter no máximo 20 caracteres')
})
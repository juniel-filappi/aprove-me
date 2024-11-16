import api from "@/utils/api";
import { IAuth, IUser } from "@/services/auth/interface";

type TDataLogin = {
    email: string;
    password: string;
}

type TDataRegister = {
    name: string;
    email: string;
    password: string;
}

export async function login(formData: TDataLogin) {
    const { data } = await api.post<IAuth>('/integrations/auth/login', formData);

    return data;
}

export async function register(formData: TDataRegister) {
    const { data } = await api.post<IUser>('/integrations/auth/register', formData);

    return data;
}
import api from "@/utils/api";
import { IPayable } from "@/services/payable/interface";

export async function listPayable() {
    const { data } = await api.get<IPayable[]>("/integrations/payable");

    return data;
}

export async function getPayable(id: string) {
    const { data } = await api.get<IPayable>(`/integrations/payable/${id}`);

    return data;
}

export async function createPayable(formData: Omit<IPayable, 'id'|'assignor'>) {
    const { data } = await api.post<IPayable>("/integrations/payable", formData);

    return data;
}

export async function updatePayable(id: string, formData: Omit<IPayable, 'assignor'|'id'>) {
    const { data } = await api.put<IPayable>(`/integrations/payable/${id}`, formData);

    return data;
}

export async function deletePayable(id: string) {
    await api.delete(`/integrations/payable/${id}`);
}
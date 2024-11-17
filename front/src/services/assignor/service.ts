import api from "@/utils/api";
import { IAssignor } from "@/services/assignor/interface";

export async function listAssignors() {
    const { data } = await api.get<IAssignor[]>("/integrations/assignor");

    return data;
}

export async function getAssignor(id: string) {
    const { data } = await api.get<IAssignor>(`/integrations/assignor/${id}`);

    return data;
}

export async function createAssignor(formData: Omit<IAssignor, 'id'>) {
    const { data } = await api.post<IAssignor>("/integrations/assignor", formData);

    return data;
}

export async function updateAssignor(formData: IAssignor) {
    const { data } = await api.put<IAssignor>(`/integrations/assignor/${formData.id}`, {
        name: formData.name,
        email: formData.email,
        document: formData.document,
        phone: formData.phone
    });

    return data;
}

export async function deleteAssignor(id: string) {
    await api.delete(`/integrations/assignor/${id}`);
}
import api from "@/utils/api";
import { IPayable } from "@/services/payable/interface";

export async function listPayable() {
    const { data } = await api.get<IPayable[]>("/integrations/payable");

    return data;
}
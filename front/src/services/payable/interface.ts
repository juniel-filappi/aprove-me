import { IAssignor } from "@/services/assignor/interface";

export interface IPayable {
    id: string;
    assignor: IAssignor;
    assignorId: string;
    value: number;
    emissionDate: string;
}
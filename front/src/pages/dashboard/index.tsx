'use client'

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { usePayable } from "@/hooks/usePayable";
import { IPayable } from "@/services/payable/interface";
import { Button } from "primereact/button";
import LayoutDashboard from "@/components/LayoutDashboard";
import Head from "next/head";

export default function Dashboard() {
    const { data, isLoading } = usePayable();

    const valueBodyTemplate = (rowData: IPayable) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(rowData.value);
    }

    const emissionDateBodyTemplate = (rowData: IPayable) => {
        return new Intl.DateTimeFormat('pt-BR').format(new Date(rowData.emissionDate));
    }

    const assignorBodyTemplate = (rowData: IPayable) => {
        return rowData.assignor.name;
    }

    return (
        <LayoutDashboard>
            <Head>
                <title>Recebíveis | Aprove-me</title>
            </Head>
            <h1 className="text-4xl">Recebíveis</h1>
            <div className="mt-10">
                <div className="flex justify-end mb-2">
                    <Button label="Cadastrar recebível" />
                </div>
                <DataTable
                    value={data}
                    className="w-full"
                    stripedRows
                    paginator
                    size="small"
                    rows={5}
                    loading={isLoading}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    emptyMessage="Não há recebíveis no momento."
                >
                    <Column field="assignor" header="Cedente" body={assignorBodyTemplate} />
                    <Column field="value" header="Valor" body={valueBodyTemplate} />
                    <Column field="emissionDate" header="Data de emissão" body={emissionDateBodyTemplate} />
                </DataTable>
            </div>
        </LayoutDashboard>
    )
}
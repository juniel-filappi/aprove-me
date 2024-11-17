'use client'

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDeletePayable, usePayable } from "@/hooks/usePayable";
import { IPayable } from "@/services/payable/interface";
import { Button } from "primereact/button";
import LayoutDashboard from "@/components/LayoutDashboard";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { AxiosError } from "axios";
import { useToastContext } from "@/providers/ToastContextProvider";
import { formatDate, formatPrice } from "@/utils/helper";

export default function Dashboard() {
    const { data, isLoading } = usePayable();
    const { mutateAsync } = useDeletePayable();
    const router = useRouter();
    const { showToast } = useToastContext();

    const valueBodyTemplate = (rowData: IPayable) => {
        return formatPrice(rowData.value);
    }

    const emissionDateBodyTemplate = (rowData: IPayable) => {
        return formatDate(rowData.emissionDate);
    }

    function handleDelete(id: string) {
        confirmDialog({
            header: 'Confirmação',
            message: 'Tem certeza que deseja excluir o recebível?',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: async () => {
                try {
                    await mutateAsync(id);
                    showToast({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Recebível excluído com sucesso.'
                    })
                } catch (error) {
                    if (error instanceof AxiosError) {
                        showToast({
                            severity: 'error',
                            summary: 'Erro',
                            detail: error.response?.data?.message
                        })
                    } else {
                        showToast({
                            severity: 'error',
                            summary: 'Erro',
                            detail: 'Não foi possível excluir o recebível.'
                        })
                    }
                }
            }
        })
    }

    const actionsBodyTemplate = (rowData: IPayable) => {
        return (
            <div className="flex justify-center space-x-2">
                <Button
                    tooltip="Visualizar recebível"
                    tooltipOptions={{ position: 'left' }}
                    icon="pi pi-eye"
                    rounded
                    text
                    size="small"
                    onClick={() => router.push(`/dashboard/payable/${rowData.id}`)}
                />
                <Button
                    tooltip="Editar recebível"
                    tooltipOptions={{ position: 'left' }}
                    icon="pi pi-pencil"
                    rounded
                    text
                    size="small"
                    severity="success"
                    onClick={() => router.push(`/dashboard/payable/update/${rowData.id}`)}
                />
                <Button
                    tooltip="Excluir recebível"
                    tooltipOptions={{ position: 'left' }}
                    icon="pi pi-trash"
                    rounded
                    text
                    size="small"
                    severity="danger"
                    onClick={() => handleDelete(rowData.id)}
                />
            </div>
        );
    }

    return (
        <LayoutDashboard>
            <Head>
                <title>Recebíveis | Aprove-me</title>
            </Head>
            <ConfirmDialog />
            <h1 className="text-4xl">Recebíveis</h1>
            <div className="mt-10">
                <div className="flex justify-end mb-2">
                    <Button label="Cadastrar recebível" icon="pi pi-plus" onClick={() => router.push('/dashboard/payable/create')} />
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
                    <Column field="id" header="Id" />
                    <Column field="value" header="Valor" body={valueBodyTemplate} />
                    <Column field="emissionDate" header="Data de emissão" body={emissionDateBodyTemplate} />
                    <Column field="actions" body={actionsBodyTemplate} />
                </DataTable>
            </div>
        </LayoutDashboard>
    )
}
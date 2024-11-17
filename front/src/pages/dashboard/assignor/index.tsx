'use client'

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useAssignor, useDeleteAssignor } from "@/hooks/useAssignor";
import { useRouter } from "next/navigation";
import { IAssignor } from "@/services/assignor/interface";
import LayoutDashboard from "@/components/LayoutDashboard";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import Head from "next/head";
import { useToastContext } from "@/providers/ToastContextProvider";
import { AxiosError } from "axios";

export default function Assignor() {
    const { data, isLoading } = useAssignor();
    const { mutateAsync } = useDeleteAssignor();
    const router = useRouter();
    const { showToast } = useToastContext();

    function handleDelete(id: string) {
        confirmDialog({
            header: 'Confirmação',
            message: 'Tem certeza que deseja excluir o cedente?',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim',
            rejectLabel: 'Não',
            accept: async () => {
                try {
                    await mutateAsync(id);
                    showToast({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Cedente excluído com sucesso.'
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
                            detail: 'Não foi possível excluir o cedente.'
                        })
                    }
                }
            }
        })
    }

    const actionsBodyTemplate = (rowData: IAssignor) => {
        return (
            <div className="flex justify-end gap-2">
                <Button
                    tooltip="Editar cedente"
                    tooltipOptions={{ position: 'left' }}
                    icon="pi pi-pencil"
                    size="small"
                    rounded
                    text
                    severity="success"
                    onClick={() => router.push(`/dashboard/assignor/update/${rowData.id}`)}
                />
                <Button
                    tooltip="Excluir cedente"
                    tooltipOptions={{ position: 'left' }}
                    icon="pi pi-trash"
                    size="small"
                    text
                    rounded
                    severity="danger"
                    onClick={() => handleDelete(rowData.id)}
                />
            </div>
        )
    }

    return (
        <LayoutDashboard>
            <Head>
                <title>Cedentes | Aprove-me</title>
            </Head>
            <ConfirmDialog />
            <h1 className="text-4xl">Cedentes</h1>
            <div className="mt-10">
                <div className="flex justify-end mb-2">
                    <Button label="Cadastrar cedente" onClick={() => router.push('/dashboard/assignor/create')} />
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
                    emptyMessage="Não há cedentes no momento."
                >
                    <Column field="name" header="Nome" />
                    <Column field="email" header="Email" />
                    <Column field="document" header="Documento" />
                    <Column field="phone" header="Telefone" />
                    <Column field="actions" body={actionsBodyTemplate} />
                </DataTable>
            </div>
        </LayoutDashboard>
    )
}
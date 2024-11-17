'use client'

import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useToastContext } from "@/providers/ToastContextProvider";
import LayoutDashboard from "@/components/LayoutDashboard";
import { AxiosError } from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";
import { useGetAssignor } from "@/hooks/useAssignor";
import Head from "next/head";

export default function Show({ id }: { id: string }) {
    const router = useRouter();
    const { showToast } = useToastContext();
    const { data: assignor, error, isError, isLoading } = useGetAssignor(id);

    useLayoutEffect(() => {
        if (isError) {
            if (error instanceof AxiosError) {
                showToast({
                    severity: 'error',
                    summary: 'Erro',
                    detail: error.response?.data.message
                })
            } else {
                showToast({
                    severity: 'error',
                    summary: 'Erro',
                    detail: 'Erro ao buscar cedente.'
                })
            }

            router.back();
        }
    }, [error, isError, router, showToast]);

    return (
        <LayoutDashboard>
            <Head>
                <title>Visualizar Cedente | Aprove-me</title>
            </Head>
            <h1 className="text-4xl">Visualizar Cedente</h1>
            {isLoading && <ProgressSpinner />}
            {assignor && (
                <Card className="mt-10" title="Descrição:">
                    <div className="flex flex-col">
                        <span><b>ID:</b> {assignor.id}</span>
                        <span><b>Nome:</b> {assignor.name}</span>
                        <span><b>Email:</b> {assignor.email}</span>
                        <span><b>Documento:</b> {assignor.document}</span>
                        <span><b>Telefone:</b> {assignor.phone}</span>
                    </div>
                    <Button
                        className="mt-2"
                        label="Voltar"
                        severity="secondary"
                        icon="pi pi-arrow-left"
                        outlined
                        onClick={() => router.back()}
                    />
                </Card>
            )}
        </LayoutDashboard>
    )
}

export async function getServerSideProps({params}: { params: { id: string } }) {
    return {
        props: {
            id: params.id,
        }
    }
}
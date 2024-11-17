'use client'

import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useToastContext } from "@/providers/ToastContextProvider";
import LayoutDashboard from "@/components/LayoutDashboard";
import { AxiosError } from "axios";
import { useGetPayable } from "@/hooks/usePayable";
import { ProgressSpinner } from "primereact/progressspinner";
import { Card } from "primereact/card";
import { formatDate, formatPrice } from "@/utils/helper";
import Head from "next/head";

export default function Show({ id }: { id: string }) {
    const router = useRouter();
    const { showToast } = useToastContext();
    const { data: payable, error, isError, isLoading } = useGetPayable(id);

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
                    detail: 'Erro ao buscar recebível.'
                })
            }

            router.back();
        }
    }, [error, isError, router, showToast]);

    return (
        <LayoutDashboard>
            <Head>
                <title>Visualizar Recebível | Aprove-me</title>
            </Head>
            <h1 className="text-4xl">Visualizar Recebível</h1>
            {isLoading && <ProgressSpinner />}
            {payable && (
                <Card className="mt-10" title="Descrição:">
                    <div className="flex flex-col">
                        <span><b>ID:</b> {payable.id}</span>
                        <span><b>Cedente:</b> {payable.assignor.name}</span>
                        <span><b>Valor:</b> {formatPrice(payable.value)}</span>
                        <span><b>Data de emissão:</b> {formatDate(payable.emissionDate)}</span>
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
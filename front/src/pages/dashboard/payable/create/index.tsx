'use client'

import LayoutDashboard from "@/components/LayoutDashboard";
import { useFormik } from "formik";
import FormPayable from "@/components/payable/FormPayable";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useCreatePayable } from "@/hooks/usePayable";
import { useLayoutEffect } from "react";
import { useToastContext } from "@/providers/ToastContextProvider";
import { AxiosError } from "axios";
import { createOrUpdatePayableSchema } from "@/components/payable/validation";
import Head from "next/head";

export default function Create() {
    const router = useRouter();
    const { showToast } = useToastContext();
    const { mutate, isPending, isSuccess, isError, error } = useCreatePayable();
    const formik = useFormik({
        validationSchema: createOrUpdatePayableSchema,
        initialValues: {
            value: 0,
            emissionDate: new Date(),
            assignorId: '',
        },
        onSubmit: (data) => mutate({
            ...data,
            emissionDate: data.emissionDate.toISOString(),
        }),
    });

    useLayoutEffect(() => {
        if (isSuccess) {
            showToast({
                severity: 'success',
                summary: 'Recebível criado com sucesso!',
                detail: 'O recebível foi criado com sucesso.'
            });
            router.push('/dashboard/payable');
        }

        if (isError) {
            if (error instanceof AxiosError) {
                showToast({
                    severity: 'error',
                    summary: 'Erro ao criar recebível!',
                    detail: error.response?.data.message || 'Ocorreu um erro ao tentar criar o recebível.'
                });
            } else {
                showToast({
                    severity: 'error',
                    summary: 'Erro ao criar recebível!',
                    detail: 'Ocorreu um erro ao tentar criar o recebível.'
                });
            }
        }
    }, [error, isError, isSuccess, router, showToast]);

    return (
        <LayoutDashboard>
            <Head>
                <title>Criar Recebível | Aprove-me</title>
            </Head>
            <h1 className="text-4xl">Criar Recebível</h1>
            <form className="mt-10" onSubmit={formik.handleSubmit}>
                <FormPayable formik={formik} loading={isPending}/>
                <div className="flex justify-between mt-4">
                    <Button
                        type="button"
                        label="Voltar"
                        severity="secondary"
                        outlined
                        icon="pi pi-arrow-left"
                        loading={isPending}
                        onClick={() => router.push('/dashboard/payable')}
                    />
                    <Button type="submit" label="Salvar" loading={isPending}/>
                </div>
            </form>
        </LayoutDashboard>
    )
}
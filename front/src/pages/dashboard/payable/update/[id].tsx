'use client'

import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useLayoutEffect } from "react";
import { useToastContext } from "@/providers/ToastContextProvider";
import LayoutDashboard from "@/components/LayoutDashboard";
import { AxiosError } from "axios";
import { useGetPayable, useUpdatePayable } from "@/hooks/usePayable";
import { createOrUpdatePayableSchema } from "@/components/payable/validation";
import FormPayable from "@/components/payable/FormPayable";
import Head from "next/head";

export default function Update({ id }: { id: string }) {
    const router = useRouter();
    const { showToast } = useToastContext();
    const { mutate, isPending, isSuccess, isError, error } = useUpdatePayable(id);
    const { data: payable } = useGetPayable(id);
    const formik = useFormik({
        validationSchema: createOrUpdatePayableSchema,
        initialValues: {
            value: 0,
            emissionDate: new Date(),
            assignorId: ''
        },
        onSubmit: (data) => mutate({
            ...data,
            emissionDate: data.emissionDate.toISOString()
        })
    })

    useLayoutEffect(() => {
        if (payable) {
            formik.setValues({
                value: payable.value,
                emissionDate: new Date(payable.emissionDate),
                assignorId: payable.assignorId
            })
        }

        if (isSuccess) {
            showToast({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Recebível atualizado com sucesso.'
            })
            router.push('/dashboard/payable');
        }

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
                    detail: 'Erro ao atualizar recebível.'
                })
            }
        }
    }, [error, isError, isSuccess, router, showToast, payable]);

    return (
        <LayoutDashboard>
            <Head>
                <title>Atualizar Recebível | Aprove-me</title>
            </Head>
            <h1 className="text-4xl">Atualizar Recebível</h1>
            <form className="mt-10" onSubmit={formik.handleSubmit}>
                <FormPayable formik={formik} loading={isPending} />
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
                    <Button type="submit" label="Salvar" loading={isPending} />
                </div>
            </form>
        </LayoutDashboard>
    )
}

export async function getServerSideProps({ params }: { params: { id: string } }) {
    return {
        props: {
            id: params.id,
        }
    }
}
'use client'

import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import FormAssignor from "@/components/assignor/FormAssignor";
import { useFormik } from "formik";
import { createOrUpdateAssignorSchema } from "@/components/assignor/validation";
import { useGetAssignor, useUpdateAssignor } from "@/hooks/useAssignor";
import { useLayoutEffect } from "react";
import { useToastContext } from "@/providers/ToastContextProvider";
import LayoutDashboard from "@/components/LayoutDashboard";
import { AxiosError } from "axios";
import Head from "next/head";

export default function Update({ id }: { id: string }) {
    const router = useRouter();

    const { showToast } = useToastContext();
    const { mutate, isPending, isSuccess, isError, error } = useUpdateAssignor(id);
    const { data: assignor } = useGetAssignor(id);

    const formik = useFormik({
        validationSchema: createOrUpdateAssignorSchema,
        initialValues: {
            name: '',
            email: '',
            document: '',
            phone: ''
        },
        onSubmit: (data) => mutate(data)
    })

    useLayoutEffect(() => {
        if (assignor) {
            formik.setValues({
                name: assignor.name,
                email: assignor.email,
                document: assignor.document,
                phone: assignor.phone
            })
        }

        if (isSuccess) {
            showToast({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Cedente atualizado com sucesso.'
            })
            router.push('/dashboard/assignor');
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
                    detail: 'Erro ao atualizar cedente.'
                })
            }
        }
    }, [assignor, error, isError, isSuccess, router, showToast]);

    return (
        <LayoutDashboard>
            <Head>
                <title>Atualizar Cedente | Aprove-me</title>
            </Head>
            <h1 className="text-4xl">Atualizar Cedente</h1>
            <form className="mt-10" onSubmit={formik.handleSubmit}>
                <FormAssignor formik={formik} loading={isPending} />
                <div className="flex justify-between mt-4">
                    <Button
                        type="button"
                        label="Voltar"
                        severity="secondary"
                        outlined
                        icon="pi pi-arrow-left"
                        loading={isPending}
                        onClick={() => router.push('/dashboard/assignor')}
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
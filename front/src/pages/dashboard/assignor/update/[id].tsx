'use client'

import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import FormAssignor from "@/components/assignor/FormAssignor";
import { useFormik } from "formik";
import { createOrUpdateAssignorSchema } from "@/components/assignor/validation";
import { useUpdateAssignor } from "@/hooks/useAssignor";
import { useLayoutEffect } from "react";
import { useToastContext } from "@/providers/ToastContextProvider";
import LayoutDashboard from "@/components/LayoutDashboard";
import { getAssignor } from "@/services/assignor/service";
import { IAssignor } from "@/services/assignor/interface";
import { AxiosError } from "axios";

export const dynamicParams = true;

export default function Update({ assignor }: { assignor: IAssignor }) {
    const router = useRouter();
    const { showToast } = useToastContext();
    const { mutate, isPending, isSuccess, isError, error } = useUpdateAssignor();
    const formik = useFormik({
        validationSchema: createOrUpdateAssignorSchema,
        initialValues: {
            name: assignor.name,
            email: assignor.email,
            document: assignor.document,
            phone: assignor.phone
        },
        onSubmit: (data) => mutate({ ...data, id: assignor.id })
    })

    useLayoutEffect(() => {
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
    }, [error, isError, isSuccess, router, showToast]);

    return (
        <LayoutDashboard>
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
    try {
        const assignor = await getAssignor(params.id);

        return {
            props: { assignor }
        }
    } catch {
        return {
            notFound: true
        }
    }
}
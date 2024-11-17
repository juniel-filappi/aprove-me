'use client'

import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import FormAssignor from "@/components/assignor/FormAssignor";
import { useFormik } from "formik";
import { createOrUpdateAssignorSchema } from "@/components/assignor/validation";
import { useCreateAssignor } from "@/hooks/useAssignor";
import { useLayoutEffect } from "react";
import { useToastContext } from "@/providers/ToastContextProvider";
import LayoutDashboard from "@/components/LayoutDashboard";

export default function Create() {
    const router = useRouter();
    const { showToast } = useToastContext();
    const { mutate, isPending, isSuccess } = useCreateAssignor();
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
        if (isSuccess) {
            showToast({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Cedente cadastrado com sucesso.'
            })
            router.push('/dashboard/assignor');
        }
    }, [isSuccess, router, showToast]);

    return (
        <LayoutDashboard>
            <h1 className="text-4xl">Cadastrar Cedente</h1>
            <form className="mt-10" onSubmit={formik.handleSubmit}>
                <FormAssignor formik={formik} loading={isPending} />
                <div className="flex justify-between mt-4">
                    <Button
                        type="button"
                        label="Voltar"
                        severity="secondary"
                        outlined
                        icon="pi pi-arrow-left"
                        onClick={() => router.push('/dashboard/assignor')}
                    />
                    <Button type="submit" label="Salvar" />
                </div>
            </form>
        </LayoutDashboard>
    )
}
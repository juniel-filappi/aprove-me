'use client'

import { Card } from "primereact/card";
import { InputText } from "@/components/InputText";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useLogin";
import { useFormik } from "formik";
import { loginSchemaValidation } from "@/pages/validation";
import { InputPassword } from "@/components/InputPassword";
import { useToastContext } from "@/providers/ToastContextProvider";
import { useLayoutEffect } from "react";
import { AxiosError } from "axios";
import Head from "next/head";

export default function Login() {
    const router = useRouter();
    const { mutate, isPending, isError, isSuccess, error } = useLogin();
    const { showToast } = useToastContext();

    const { handleChange, values, handleSubmit, errors } = useFormik({
        validationSchema: loginSchemaValidation,
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => mutate(values)
    })

    useLayoutEffect(() => {
        if (isSuccess) {
            router.push('/dashboard/payable');
        }

        if (isError) {
            if (error instanceof AxiosError) {
                showToast({ severity: 'error', summary: 'Erro', detail: error.response?.data.message });
            }
        }
    }, [isSuccess, isError, error, router, showToast]);

    return (
        <div className="flex justify-center h-full items-center">
            <Head>
                <title>Login | Aprove-me</title>
            </Head>
            <Card title="Login" className="w-[400px]">
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <InputText
                        id="email"
                        name="email"
                        label="Email"
                        placeholder="Digite seu email"
                        error={errors.email}
                        value={values.email}
                        onChange={handleChange}
                        loading={+isPending}
                    />
                    <InputPassword
                        id="password"
                        name="password"
                        label="Senha"
                        placeholder="Digite sua senha"
                        error={errors.password}
                        value={values.password}
                        onChange={handleChange}
                        loading={+isPending}
                    />

                    <div className="flex gap-2">
                        <small>Não tem uma conta?</small>
                        <Button
                            label="Cadastrar"
                            link
                            className="!p-0"
                            size="small"
                            type="button"
                            loading={isPending}
                            onClick={() => router.push('/register')}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" label="Entrar" loading={isPending} />
                    </div>
                </form>
            </Card>
        </div>
    );
}

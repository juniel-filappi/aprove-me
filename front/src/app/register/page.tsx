'use client'

import { Card } from "primereact/card";
import { InputText } from "@/components/InputText";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { registerSchemaValidation } from "@/app/register/validation";
import { useRegister } from "@/hooks/useRegister";
import { InputPassword } from "@/components/InputPassword";

export default function Register() {
    const router = useRouter();
    const { mutate, isPending, isSuccess } = useRegister();

    const { handleChange, values, errors, handleSubmit } = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: registerSchemaValidation,
        onSubmit: values => {
            mutate(values);
        },
    })

    if (isSuccess) {
        router.push('/dashboard');
    }

    return (
        <div className="flex justify-center h-full items-center">
            <Card title="Registrar" className="w-[400px]">
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <InputText
                        id="name"
                        name="name"
                        label="Nome"
                        placeholder="Digite seu nome"
                        value={values.name}
                        onChange={handleChange}
                        error={errors.name}
                        loading={+isPending}
                    />
                    <InputText
                        id="email"
                        name="email"
                        label="Email"
                        placeholder="Digite seu email"
                        value={values.email}
                        onChange={handleChange}
                        error={errors.email}
                        loading={+isPending}
                    />
                    <InputPassword
                        id="password"
                        name="password"
                        label="Senha"
                        placeholder="Digite sua senha"
                        value={values.password}
                        onChange={handleChange}
                        error={errors.password}
                        loading={+isPending}
                    />

                    <div className="flex gap-2">
                        <small>Já tem uma conta?</small>
                        <Button
                            type="button"
                            label="Entrar"
                            link
                            className="!p-0"
                            size="small"
                            onClick={() => router.push('/')}
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" label="Registrar" />
                    </div>
                </form>
            </Card>
        </div>
    )
}
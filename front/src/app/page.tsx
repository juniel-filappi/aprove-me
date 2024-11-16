'use client'

import { Card } from "primereact/card";
import { InputText } from "@/components/InputText";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <div className="flex justify-center h-full items-center">
            <Card title="Login" className="w-[400px]">
                <div className="flex flex-col gap-2">
                    <InputText id="username" label="Email" />
                    <InputText id="password" label="Senha" />

                    <div className="flex gap-2">
                        <small>Não tem uma conta?</small>
                        <Button
                            label="Cadastrar"
                            link
                            className="!p-0"
                            size="small"
                            onClick={() => router.push('/register')}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button label="Entrar" />
                    </div>
                </div>
            </Card>
        </div>
    );
}

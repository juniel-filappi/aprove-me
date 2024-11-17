'use client'

import { getUserLogged } from "@/utils/helper";
import { Button } from "primereact/button";
import { usePathname, useRouter } from "next/navigation";
import { useLayoutEffect, useMemo, useState } from "react";
import { IUser } from "@/services/auth/interface";
import MenuItem from "@/components/MenuItem";

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser|null>();

    const currentPath = usePathname();
    const router = useRouter();

    const menuItems = useMemo(() => [
        {
            icon: 'pi pi-home',
            label: 'Recebíveis',
            isActive: currentPath === '/dashboard',
            onClick: () => router.push('/dashboard')
        },
        {
            icon: 'pi pi-user',
            label: 'Cedentes',
            isActive: currentPath?.includes('/dashboard/assignor'),
            onClick: () => router.push('/dashboard/assignor')
        },
    ], [currentPath, router]);

    useLayoutEffect(() => {
        setUser(getUserLogged());
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    }

    return (
        <div className="flex h-screen">
            <div className="w-[20%] bg-gray-800 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-white text-3xl">Aprove-me</h1>
                        <p className="text-white">Bem vindo, {user?.name}</p>
                    </div>
                    <div>
                        <Button text icon="pi pi-sign-out" onClick={handleLogout} />
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-5">
                    {menuItems.map(({ icon, isActive, label, onClick }, index) => (
                        <MenuItem icon={icon} label={label} isActive={isActive} onClick={onClick} key={index} />
                    ))}
                </div>
            </div>
            <div className="w-[80%] p-4">
                {children}
            </div>
        </div>
    )
}
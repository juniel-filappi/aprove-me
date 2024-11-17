import { IUser } from "@/services/auth/interface";

export function getUserLogged(): IUser|null {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
}

export function formatDate(date: string): string {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
}
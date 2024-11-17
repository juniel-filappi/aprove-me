import { IUser } from "@/services/auth/interface";

export function getUserLogged(): IUser|null {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;
}
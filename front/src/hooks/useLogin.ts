import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/services/auth/service";
import { setToken } from "@/utils/api";
import { saveToken } from "@/utils/cookie";

export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: login,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ['user'] });

            setToken(data.access_token);
            await saveToken(data.access_token);
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));
        },
    })
}
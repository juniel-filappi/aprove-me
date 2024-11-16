import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "@/services/auth/service";

export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: login,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    })
}
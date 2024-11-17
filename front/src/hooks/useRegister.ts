import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "@/services/auth/service";

export function useRegister() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: register,
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: ['user'] });
        }
    })
}
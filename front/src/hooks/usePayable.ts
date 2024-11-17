import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPayable, deletePayable, getPayable, listPayable, updatePayable } from "@/services/payable/service";
import { IPayable } from "@/services/payable/interface";

export function usePayable() {
    return useQuery({ queryKey: ['payable'], queryFn: listPayable, staleTime: 1000 * 60 * 5 });
}

export function useGetPayable(id: string) {
    return useQuery({ queryKey: ['payable', id], queryFn: () => getPayable(id), staleTime: 1000 * 60 * 5 });
}

export function useCreatePayable() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createPayable,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['payable'] });
        }
    })
}

export function useUpdatePayable(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Omit<IPayable, 'id'|'assignor'>) => updatePayable(id, data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['payable'] });
        }
    })
}

export function useDeletePayable() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePayable,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['payable'] });
        }
    })
}
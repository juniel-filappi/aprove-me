import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAssignor, deleteAssignor, listAssignors, updateAssignor } from "@/services/assignor/service";

export function useAssignor() {
    return useQuery({ queryKey: ['assignor'], queryFn: listAssignors, staleTime: 1000 * 60 * 5 });
}

export function useCreateAssignor() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createAssignor,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['assignor'] });
        }
    })
}

export function useUpdateAssignor() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateAssignor,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['assignor'] });
        }
    })
}

export function useDeleteAssignor() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAssignor,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['assignor'] });
        }
    })
}
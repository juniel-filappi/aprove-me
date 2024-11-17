import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createAssignor,
    deleteAssignor,
    getAssignor,
    listAssignors,
    updateAssignor
} from "@/services/assignor/service";
import { IAssignor } from "@/services/assignor/interface";

export function useAssignor() {
    return useQuery({ queryKey: ['assignor'], queryFn: listAssignors, staleTime: 1000 * 60 * 5 });
}

export function useGetAssignor(id: string) {
    return useQuery({ queryKey: ['assignor', id], queryFn: () => getAssignor(id), staleTime: 1000 * 60 * 5 });
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

export function useUpdateAssignor(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Omit<IAssignor, 'id'>) => updateAssignor(id, data),
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
import { useQuery } from "@tanstack/react-query";
import { listPayable } from "@/services/payable/service";

export function usePayable() {
    return useQuery({ queryKey: ['payable'], queryFn: listPayable, staleTime: 1000 * 60 * 5 });
}
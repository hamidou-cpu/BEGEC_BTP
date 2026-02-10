import { useQuery } from "@tanstack/react-query";
import { type Partner } from "@shared/schema";

export function usePartners() {
  return useQuery<Partner[]>({
    queryKey: ["/api/partners"],
  });
}

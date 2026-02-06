import { useQuery } from "@tanstack/react-query";
import { type TeamMember } from "@shared/schema";

export function useTeam() {
  return useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });
}

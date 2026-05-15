import { useQuery } from "@tanstack/react-query";

export function useSetting(key: string, fallback: string = "") {
  const { data } = useQuery<{ key: string; value: string | null }>({
    queryKey: ["/api/settings", key],
    queryFn: () => fetch(`/api/settings/${key}`).then(r => r.json()),
  });
  return data?.value ?? fallback;
}

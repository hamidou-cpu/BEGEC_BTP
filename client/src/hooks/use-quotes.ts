import { useMutation } from "@tanstack/react-query";
import { api, type InsertQuoteRequest } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useQuote() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertQuoteRequest) => {
      const res = await fetch(api.quotes.submit.path, {
        method: api.quotes.submit.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.quotes.submit.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to submit quote request");
      }
      
      return api.quotes.submit.responses[200].parse(await res.json());
    },
    onSuccess: (data) => {
      toast({
        title: "Demande reçue",
        description: data.message,
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  });
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import type { InsertIdea, Idea } from "@shared/schema";
import { z } from "zod";

export function useIdea(id: number) {
  return useQuery({
    queryKey: [api.ideas.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.ideas.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch idea analysis");
      return api.ideas.get.responses[200].parse(await res.json());
    },
    enabled: !!id && !isNaN(id),
  });
}

export function useAnalyzeIdea() {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertIdea) => {
      // Validate input before sending
      const validated = api.ideas.analyze.input.parse(data);
      
      const res = await fetch(api.ideas.analyze.path, {
        method: api.ideas.analyze.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.ideas.analyze.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        if (res.status === 500) {
          const error = api.ideas.analyze.responses[500].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Analysis failed. Please try again.");
      }

      return api.ideas.analyze.responses[200].parse(await res.json());
    },
    onSuccess: (data) => {
      // Pre-populate the query cache with the new data
      queryClient.setQueryData([api.ideas.get.path, data.id], data);
      
      toast({
        title: "Analysis Complete!",
        description: "Your startup idea has been validated by our AI experts.",
        className: "bg-green-600 text-white border-none",
      });
      
      setLocation(`/result/${data.id}`);
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });
}

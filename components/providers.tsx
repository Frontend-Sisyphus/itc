"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { JoinProvider } from "@/lib/join-context";
import { ApplyModal } from "@/components/apply-modal";
import { AmbientEdges } from "@/components/ambient-edges";
import { useState, type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <JoinProvider>
        <AmbientEdges />
        <div className="relative z-10">{children}</div>
        <ApplyModal />
      </JoinProvider>
    </QueryClientProvider>
  );
}

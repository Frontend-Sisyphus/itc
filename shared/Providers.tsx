"use client";
import React, { useState, ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { JoinProvider } from "@/context/JoinProvider";
import { ApplyModal } from "@/features/ApplyModal";
import { AmbientEdges } from "@/shared/AmbientEdges";

export interface ProvidersProps {
  children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
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
};

export default Providers;

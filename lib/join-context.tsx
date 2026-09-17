"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type JoinContextValue = {
  open: boolean;
  openJoin: () => void;
  closeJoin: () => void;
};

const JoinContext = createContext<JoinContextValue | null>(null);

export function JoinProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openJoin = useCallback(() => setOpen(true), []);
  const closeJoin = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openJoin, closeJoin }),
    [open, openJoin, closeJoin],
  );

  return <JoinContext.Provider value={value}>{children}</JoinContext.Provider>;
}

export function useJoin() {
  const ctx = useContext(JoinContext);
  if (!ctx) {
    throw new Error("useJoin must be used within JoinProvider");
  }
  return ctx;
}

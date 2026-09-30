"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

interface JoinContextValue {
  open: boolean;
  openJoin: () => void;
  closeJoin: () => void;
}

const JoinContext = createContext<JoinContextValue | null>(null);

export interface JoinProviderProps {
  children: ReactNode;
}

export const JoinProvider: React.FC<JoinProviderProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);

  const openJoin = useCallback(() => setOpen(true), []);
  const closeJoin = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, openJoin, closeJoin }),
    [open, openJoin, closeJoin]
  );

  return <JoinContext.Provider value={value}>{children}</JoinContext.Provider>;
};

export const useJoin = (): JoinContextValue => {
  const context = useContext(JoinContext);
  if (!context) {
    throw new Error("useJoin must be used within a JoinProvider");
  }
  return context;
};

export default JoinProvider;

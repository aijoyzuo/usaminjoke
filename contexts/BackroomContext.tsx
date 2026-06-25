'use client';

import { createContext, useState, useContext, ReactNode } from "react";

interface BackroomContextType {
  isOn: boolean;
  toggle: () => void;
}

const BackroomContext = createContext<BackroomContextType | null>(null);

export function BackroomProvider({ children }: { children: ReactNode }) {
  const [isOn, setIsOn] = useState(false);
  const toggle = () => setIsOn((prev) => !prev);

  return (
    <BackroomContext.Provider value={{ isOn, toggle }}>
      {children}
    </BackroomContext.Provider>
  );
}

export function useBackroom() {
  const context = useContext(BackroomContext);
  if (!context) throw new Error("useBackroom must be used within BackroomProvider");
  return context;
}

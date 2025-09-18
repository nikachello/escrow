"use client";

import { createContext, useContext, ReactNode } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { Loader2 } from "lucide-react";

export type SessionType = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
  } | null;
};

interface SessionContextValue {
  session: SessionType | null;
  loading: boolean;
  refetch: () => void;
}

const SessionContext = createContext<SessionContextValue | undefined>(
  undefined
);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: session,
    isPending: loading,
    refetch,
  } = authClient.useSession();

  if (loading) {
    // Render full-page loader until session is ready
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <Loader2 className="animate-spin w-10 h-10 text-primary" />
      </div>
    );
  }

  return (
    <SessionContext.Provider value={{ session, loading, refetch }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

import { useState, useEffect } from "react";
import { getCurrentUserEmail } from "@/lib/auth/session-utils";

export const useCurrentUser = () => {
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initializeUser = async () => {
      try {
        const email = await getCurrentUserEmail();
        if (isMounted) {
          setCurrentUserEmail(email);
        }
      } catch (error) {
        console.error("მომხმარებელი არ მოიძებნა:", error);
        if (isMounted) {
          setCurrentUserEmail(null);
        }
      } finally {
        if (isMounted) {
          setLoadingSession(false);
        }
      }
    };

    initializeUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    currentUserEmail,
    loadingSession,
    isAuthenticated: currentUserEmail !== null,
  };
};

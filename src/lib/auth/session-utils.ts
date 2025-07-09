import { authClient } from "./auth-client";
import { toast } from "sonner";

export const getCurrentUserEmail = async (): Promise<string | null> => {
  try {
    const session = await authClient.getSession();
    return session.data?.user.email ?? null;
  } catch (error) {
    console.error("Session fetch failed", error);
    toast.error("მოხდა შეცდომა");
    return null;
  }
};

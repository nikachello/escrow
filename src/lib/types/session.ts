export type SessionType = {
  session: {
    id: string;
    token: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;
  };
  user: {
    id: string;
    email: string;
    emailVerified: boolean;
    firstName: string;
    lastName: string;
    name: string;
    nationalId: string;
    phone: string;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
};

import type { PrismaClient } from "@prisma/client";

declare global {
  namespace globalThis {
    var prisma: PrismaClient;
  }
}

// widen Session type to include user id
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
    };
  }
}

// change unstable_getServerSession returning type
declare module "next-auth/next" {
  import type { Session } from "next-auth";
  export function unstable_getServerSession(
    ...args: Parameters<typeof getServerSession>
  ): Promise<Session | null>;
}

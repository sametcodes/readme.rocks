import type { Session } from "next-auth";
import type { NextApiResponse, NextApiHandler } from "next";
import type {
  PrismaClient,
  PlatformQueryConfig,
  Connection,
} from "@prisma/client";

type ResponseLocals = {
  locals: {
    platform: Platform;
    query: PlatformQuery;
    config: any;
    connection: Connection?;
    services: any;
    templates: any;
  };
};

declare global {
  namespace globalThis {
    var prisma: PrismaClient;
  }
}

// widen Session type to include user id
declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      id: string;
      email: string;
      image: string;
    };
  }
}

// change unstable_getServerSession returning type
declare module "next-auth/next" {
  export function unstable_getServerSession(
    ...args: Parameters<typeof getServerSession>
  ): Promise<Session | null>;
}

// wide NexApiResponse for res.locals
// but don't override, wide
declare module "next" {
  type NextApiHandler<T = any> = (
    req: NextApiRequest,
    res: NextApiResponse<T> & ResponseLocals
  ) => unknown | Promise<unknown>;
  type NextApiResponse = NextApiResponse & ResponseLocals;
}

declare module "http" {}

import { Connection, PlatformCode } from "@prisma/client";
import prisma from "@/services/prisma";
import { requestNewAccessToken } from "passport-oauth2-refresh";

import { Session } from "next-auth";

type ISignIn = {
  token: any;
  session: Session;
  platformCode: PlatformCode;
  profile: any;
};

type IGetConnection = {
  session: Session;
  platformCode?: PlatformCode;
};

type IDisconnect = {
  session: Session;
  platformCode: PlatformCode;
};

type IUpdateConnection = {
  connection: Connection;
  data: {
    access_token: string;
    expires_at: number;
    refresh_token?: string;
    refresh_token_expires_at?: number;
  };
};

const actions = {
  connect: async ({ token, profile, session, platformCode }: ISignIn) => {
    const platform = await prisma.platform.findFirst({
      where: { code: platformCode },
    });

    if (!platform) return console.error("Platform not found");

    const currentConnection = await prisma.connection.findFirst({
      where: {
        userId: session.user.id as string,
        type: "oauth",
        platformId: platform.id,
      },
    });

    if (currentConnection) {
      return prisma.connection.update({
        where: { id: currentConnection.id },
        data: {
          access_token: token.access_token as string,
          refresh_token: token.refresh_token as string,
          scope: (token.scope as string) || "",
          token_type: (token.token_type as string) || "",

          expires_at: token.expires_at,
          refresh_token_expires_at: token.refresh_token_expires_at,

          profile: {
            upsert: {
              update: {
                name: profile.name,
                email: profile.email,
                image: profile.image,
              },
              create: {
                name: profile.name,
                email: profile.email,
                image: profile.image,
                userId: session.user.id as string,
                platformId: platform.id,
              },
            },
          },
        },
      });
    }

    const connection = await prisma.connection.create({
      data: {
        access_token: token.access_token as string,
        refresh_token: token.refresh_token as string,
        scope: (token.scope as string) || "",
        token_type: (token.token_type as string) || "",
        expires_at: token.expires_at,
        refresh_token_expires_at: token.refresh_token_expires_at,
        type: "oauth",
        platformId: platform.id,
        userId: session.user.id as string,
      },
    });

    await prisma.connectionProfile.create({
      data: {
        name: profile.name,
        email: profile.email,
        image: profile.image,
        connectionId: connection.id,
        userId: session.user.id as string,
        platformId: platform.id,
      },
    });
  },
  disconnect: async ({ session, platformCode }: IDisconnect) => {
    const _platform = await prisma.platform.findFirst({
      where: { code: platformCode },
    });
    if (!_platform) throw new Error(`Platform not found`);

    const connection = await prisma.connection.findFirst({
      where: {
        userId: session.user.id as string,
        type: "oauth",
        platformId: _platform.id,
      },
    });

    if (!connection) throw new Error(`Connection not found`);
    return prisma.connection.delete({ where: { id: connection.id } });
  },
  getConnections: async ({ session, platformCode }: IGetConnection) => {
    const platform = await prisma.platform.findFirst({
      where: { code: platformCode },
    });
    if (!platform) throw new Error(`Platform not found`);

    return prisma.connection.findFirst({
      where: {
        userId: session.user.id as string,
        type: "oauth",
        platformId: platform.id,
      },
      select: {
        expires_at: true,
        profile: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });
  },
  getAllConnections: async ({ session }: IGetConnection) => {
    return prisma.connection.findMany({
      where: {
        userId: session.user.id as string,
        type: "oauth",
      },
      select: {
        id: true,
        expires_at: true,
        profile: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
        platform: {
          select: {
            id: true,
            code: true,
            name: true,
            _count: {
              select: {
                queries: true,
              },
            },
          },
        },
      },
    });
  },
  updateConnection: async ({ connection, data }: IUpdateConnection) => {
    return prisma.connection.update({
      where: { id: connection.id },
      data: {
        access_token: data.access_token as string,
        expires_at: data.expires_at,
        refresh_token: data.refresh_token as string,
        refresh_token_expires_at: data.refresh_token_expires_at,
      },
    });
  },
  refreshAccessToken: async (platformCode: string, connection: Connection) => {
    return new Promise((resolve, reject) => {
      requestNewAccessToken(
        platformCode,
        connection.refresh_token as string,
        async (
          err: { statusCode: number; data?: any },
          accessToken: string,
          refreshToken: string,
          result: any
        ) => {
          if (err) return reject(err);
          if (result?.error) return reject(new Error(result.error_description));

          return actions
            .updateConnection({
              connection,
              data: {
                access_token: accessToken as string,
                refresh_token: refreshToken as string,
                refresh_token_expires_at:
                  Date.now() + Number(result.refresh_token_expires_in) * 1000,
                expires_at: Date.now() + Number(result.expires_in) * 1000,
              },
            })
            .then(resolve);
        }
      );
    });
  },
};

export default actions;

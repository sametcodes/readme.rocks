import prisma from "@services/prisma";
import { AccessToken } from "simple-oauth2";
import { Session } from "next-auth";
import { Provider, ConnectionProfile } from ".";

type ISignIn = {
  accessToken: AccessToken;
  session: Session;
  provider: Provider;
  profile: ConnectionProfile;
};

type IGetConnection = {
  session: Session;
  platform: string;
};

const actions = {
  signin: async ({ accessToken, session, provider, profile }: ISignIn) => {
    const platform = await prisma.platform.findFirst({
      where: { code: provider.code },
    });

    if (!platform) return console.error("Platform not found");

    const current_connection = await prisma.connection.findFirst({
      where: {
        userId: session.user.id as string,
        type: "oauth",
        platformId: platform.id,
      },
    });

    if (current_connection) {
      return prisma.connection.update({
        where: { id: current_connection.id },
        data: {
          access_token: accessToken.token.access_token as string,
          expires_at: (accessToken.token.expires_at as Date).getTime(),
          refresh_token: accessToken.token.refresh_token as string,
          scope: (accessToken.token.scope as string) || "",
          token_type: (accessToken.token.token_type as string) || "",
          profile: {
            update: {
              name: profile.name,
              email: profile.email,
              image: profile.image,
            },
          },
        },
      });
    }

    const connection = await prisma.connection.create({
      data: {
        access_token: accessToken.token.access_token as string,
        refresh_token: accessToken.token.refresh_token as string,
        scope: (accessToken.token.scope as string) || "",
        token_type: (accessToken.token.token_type as string) || "",
        expires_at: (accessToken.token.expires_at as Date).getTime(),
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
  getConnections: async ({ session, platform }: IGetConnection) => {
    const _platform = await prisma.platform.findFirst({
      where: { code: platform },
    });
    if (!_platform) throw new Error(`Platform not found`);

    return prisma.connection.findFirst({
      where: {
        userId: session.user.id as string,
        type: "oauth",
        platformId: _platform.id,
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
};

export default actions;

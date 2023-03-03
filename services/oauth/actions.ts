import prisma from "@services/prisma";
import { AccessToken } from "simple-oauth2";
import { Session } from "next-auth";
import { Provider } from "./providers";

type ISignIn = {
  accessToken: AccessToken;
  session: Session;
  provider: Provider;
};

const actions = {
  signin: async ({ accessToken, session, provider }: ISignIn) => {
    const platform = await prisma.platform.findFirst({
      where: { code: provider.code },
    });

    if (!platform) return console.error("Platform not found");

    const connection = await prisma.connection.findFirst({
      where: {
        userId: session.user.id as string,
        type: "oauth",
        platformId: platform.id,
      },
    });

    if (connection)
      return prisma.connection.update({
        where: { id: connection.id },
        data: {
          access_token: accessToken.token.access_token as string,
          refresh_token: accessToken.token.refresh_token as string,
          scope: (accessToken.token.scope as string) || "",
          token_type: (accessToken.token.token_type as string) || "",
        },
      });

    await prisma.connection.create({
      data: {
        access_token: accessToken.token.access_token as string,
        refresh_token: accessToken.token.refresh_token as string,
        scope: (accessToken.token.scope as string) || "",
        token_type: (accessToken.token.token_type as string) || "",
        type: "oauth",
        platformId: platform.id,
        userId: session.user.id as string,
      },
    });
  },
};

export default actions;

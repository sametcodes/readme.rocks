import prisma from "@/services/prisma";
import { PlatformCode } from "@prisma/client";
import { Awaitable, CallbacksOptions, Session } from "next-auth";

const session: CallbacksOptions["session"] = ({
  session,
}): Awaitable<Session> => {
  if (!session) return Promise.resolve(session);
  if (!session?.user?.email) return Promise.resolve(session);

  return prisma.user
    .findUnique({
      where: { email: session.user.email },
    })
    .then((user) => ({ ...session, user })) as Awaitable<Session>;
};

const signIn: CallbacksOptions["signIn"] = async ({
  user,
  account,
  profile,
  email,
  credentials,
}) => {
  try {
    if (account?.provider) {
      const platform = await prisma.platform.findFirst({
        where: { code: account.provider as PlatformCode },
      });

      const userActiveConnection = await prisma.connection.findFirst({
        where: { userId: user.id, type: "oauth", platformId: platform?.id },
        select: { id: true, profile: { select: { id: true } } },
      });

      if (userActiveConnection) {
        await prisma.connection.update({
          where: { id: userActiveConnection.id },
          data: {
            access_token: account.access_token as string,
            scope: (account.scope as string) || "",
            token_type: (account.token_type as string) || "",
            expires_at: account.expires_at,
          },
        });
        await prisma.connectionProfile.update({
          where: { id: userActiveConnection.profile?.id },
          data: {
            name: user.name || profile?.name,
            email: user.email || profile?.email,
            image: user.image || profile?.image,
          },
        });
      } else {
        const connection = await prisma.connection.create({
          data: {
            access_token: account?.access_token as string,
            scope: (account.scope as string) || "",
            token_type: (account.token_type as string) || "oauth",
            type: "oauth",
            user: { connect: { id: user.id } },
            platform: { connect: { id: platform?.id } },
          },
        });

        await prisma.connectionProfile.create({
          data: {
            name: user.name as string,
            email: user.email as string,
            image: user.image as string,
            platform: { connect: { id: platform?.id } },
            user: { connect: { id: user.id } },
            connection: { connect: { id: connection.id } },
          },
        });
      }
    }
  } catch (err) {
    console.log(err);
  }

  return true;
};

const callbacks = {
  session,
  signIn,
};

export default callbacks;

import prisma from "@/services/prisma";
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

const callbacks = {
  session,
};

export default callbacks;

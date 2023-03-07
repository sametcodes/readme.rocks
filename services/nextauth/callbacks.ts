import prisma from "@/services/prisma";
import { CallbacksOptions } from "next-auth";

const session: CallbacksOptions["session"] = async ({ session }) => {
  if (!session) return Promise.resolve(session);
  if (!session?.user?.email) return Promise.resolve(session);

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  return Promise.resolve(Object.assign({}, session, { user }));
};

const callbacks = {
  session,
};

export default callbacks;

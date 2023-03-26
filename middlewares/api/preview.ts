import { NextApiRequest, NextApiResponse } from "next";
import { isObjectID } from "@/utils/index";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

import { shapeDataAPISchema } from "@/services/data/validations";
import { ValidationError } from "yup";
import prisma from "@/services/prisma";

export const validatePreviewRequest = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const id = req.query.id as string;
  if (isObjectID(id) === false)
    return res
      .status(400)
      .json({ message: "Query parameter is missing or invalid" });

  const query = await prisma.platformQuery.findFirst({
    where: { id },
    select: {
      id: true,
      name: true,
      platformId: true,
      platform: { select: { name: true, code: true } },
    },
  });
  if (!query) return res.status(404).json({ message: "Query not found" });

  const connection = await prisma.connection.findFirst({
    where: { userId: session.user.id, platformId: query.platformId },
  });

  // @ts-ignore
  res.locals = {};
  res.locals.config = {
    userId: session.user.id,
    platformId: query.platformId,
    platformQueryId: query.id,
  };
  res.locals.query = query;
  res.locals.platform = query.platform;
  res.locals.connection = connection;

  return next();
};

export const validatePreviewBody = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const { body } = req;
  const { query, platform } = res.locals;

  const schema = shapeDataAPISchema(platform.code, query.name);

  try {
    await schema.validate(body, { abortEarly: false });
  } catch (error) {
    if (error instanceof ValidationError) {
      const errors = error.inner
        .map((err) => ({ name: err.path, message: err.message }))
        .reduce(
          (acc: any, err: any) => ({ ...acc, [err.name]: err.message }),
          {}
        );
      return res.status(400).json({ errors });
    }
  }

  return next();
};

import { Session } from "next-auth";
import Prisma from "@prisma/client";

export type DataAPIPayload = {
  session: Session;
  payload: any;
};

export type DataAPIResponse = {
  success: boolean;
  data: any;
  error: string;
};

export type DataAPIMethod = (payload: DataAPIPayload) => Promise<any>;

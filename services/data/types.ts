import { Session } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

export type DataAPIPayload = {
  session: Session;
  params: Array<string>;
  payload: any;
};

export type DataAPIResponse = {
  success: boolean;
  data: any;
  error: string;
};

export type HandlerContext = {
  req: NextApiRequest;
  res: NextApiResponse;
};

export type DataAPIMethod<T = any> = (
  payload: DataAPIPayload,
  context: HandlerContext
) => Promise<T>;

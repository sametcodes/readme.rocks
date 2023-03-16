import { Session } from "next-auth";

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

export type DataAPIMethod<T = any> = (payload: DataAPIPayload) => Promise<T>;

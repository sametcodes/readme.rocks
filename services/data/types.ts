import { Session } from "next-auth";

export type DataAPIPayload = {
  session: Session;
  params: string[];
  payload: any;
};

export type DataAPIResponse = {
  success: boolean;
  data: any;
  error: string;
};

export type DataAPIMethod = (payload: DataAPIPayload) => Promise<any>;

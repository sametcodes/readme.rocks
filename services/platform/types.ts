type Platform = "github" | "stackoverflow" | "codewars";

export type ServiceResponse = {
  success: boolean;
  data?: any;
  platform?: Platform;
  error?: {
    message: string;
    code: number;
  };
};

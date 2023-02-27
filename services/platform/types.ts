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

export type GithubUserConfig = {
  username: string;
  token: string;
};

export type StackoverflowUserConfig = {
  userId: string;
};

export type CodewarsUserConfig = {
  username: string;
};

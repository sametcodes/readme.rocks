type Platform = "github" | "stackoverflow" | "codewars";

export type ServiceResponse = {
    success: boolean;
    data?: any;
    error?: {
        message: string;
        code: number;
    };
}
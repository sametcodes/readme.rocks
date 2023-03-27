import { Fallback } from "@/lib/@dsvgui/components/fallback";
import { NextApiResponse } from "next";
import JSXRender from "@/utils/render";

type ISendFallbackResponse = (
  res: NextApiResponse,
  data: { title: string; message: string }
) => void;

export const sendFallbackResponse: ISendFallbackResponse = (
  res,
  { title, message }
) => {
  const response = Fallback({ title, message });
  if (!response) {
    return res.status(500).json({ message: "No fallback response has set." });
  }

  const data = JSXRender(response);
  res.setHeader("Content-Type", "image/svg+xml");
  return res.status(200).send(data);
};

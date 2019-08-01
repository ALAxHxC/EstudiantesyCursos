import { Request, Response } from "express";
import { sendMail } from "./providers/sendgrid";

export const filmentReserve = (req: Request, res: Response) => {
  res.json({
    speech: 'Currently I am not having information about this team',
    fulfillmentText: 'Currently I am not having information about this team',
    source: 'team info'
  });
}
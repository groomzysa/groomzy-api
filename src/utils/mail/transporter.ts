import nodemailer from "nodemailer";
import { IMailTranspoter } from "./types";

export const getTransporter = ({
  host,
  user,
  pass,
  port = 587,
  secure = false,
}: IMailTranspoter) => {
  return nodemailer.createTransport({
    host,
    secure,
    port,
    auth: {
      user,
      pass,
    },
  });
};

import { Client } from "@prisma/client";

export interface ISignupClientArgs extends Client {}

export interface ISigninClientArgs {
  email: string;
  password: string;
  verifyPin?: string | number;
}

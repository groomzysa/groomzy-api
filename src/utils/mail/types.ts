export interface IMailTranspoter {
  host: string;
  user: string;
  pass: string;
  port?: number;
  secure?: boolean;
}

import { createTransport } from "nodemailer";

console.log(
  process.env.GROOMZY_MAIL_USER,
  process.env.GROOMZY_MAIL_PASSWORD,
  process.env.GROOMZY_MAIL_HOST,
  Number(process.env.GROOMZY_MAIL_PORT),
  process.env.GROOMZY_MAIL_SECURE
);

export const emailTransport = createTransport({
  auth: {
    user: process.env.GROOMZY_MAIL_USER,
    pass: process.env.GROOMZY_MAIL_PASSWORD,
  },
  host: process.env.GROOMZY_MAIL_HOST,
  port: Number(process.env.GROOMZY_MAIL_PORT),
  secure: process.env.GROOMZY_MAIL_SECURE === "yes" ? true : false,
});

export const clientMailContent = (givenName: string, message: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Groomzy</title>
    <style>
      .main {
        margin-left: 30%;
        margin-right: 30%;
      }
      @media screen and (max-width:768px) {
        .main {
          margin-left: 5%;
          margin-right: 5%;
        }
      }
    </style>
  </head>
  <body>
    <div class="main" align="center"> 
      <div>
        <img src="https://storage.googleapis.com/groomzy/groomzy_logo_full.png" alt="Groomzy Logo" width="200" height="80" style="display: block;" />
      </div>
      <hr color="#607d8b"/>
      <div align="left" style="margin-bottom: 2%;">
        <b>Hi ${givenName}</b>
      </div>
      <div align="left" style="margin-bottom: 2%;">
        <p>${message}</p>
      </div>
      <div style="padding: 1%; background: #607d8b;">
        <a href="">
          <img src="https://storage.googleapis.com/groomzy/google_store.png" alt="App Store" width="150" height="40" style="display: block;" />
        </a>
        <p style="color: white;">Copyright &copy; 2020 <b>Groomzy</b>. All Rights Reserved.</p>
      </div>
    </div>
  </body>
</html>
`;

export const groomzyMailContent = (query: string, message: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Groomzy</title>
    <style>
      .main {
        margin-left: 30%;
        margin-right: 30%;
      }
      @media screen and (max-width:768px) {
        .main {
          margin-left: 5%;
          margin-right: 5%;
        }
      }
    </style>
  </head>
  <body>
    <div class="main" align="center"> 
      <div>
        <img src="https://storage.googleapis.com/groomzy/groomzy_logo_full.png" alt="Groomzy Logo" width="150" height="80" />
      </div>
      <hr color="#607d8b"/>
      <div align="left" style="margin-bottom: 2%;">
        <b>${query}</b>
      </div>
      <div align="left" style="margin-bottom: 2%;">
        <p>${message}</p>
      </div>
      <div style="padding: 1%; background: #607d8b;">
        <a href="">
          <img src="https://storage.googleapis.com/groomzy/google_store.png" alt="App Store" width=150" height="40" />
        </a>
        <p style="color: white;">Copyright &copy; 2020 <b>Groomzy</b>. All Rights Reserved.</p>
      </div>
    </div>
  </body>
</html>
`;

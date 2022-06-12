import { AppServer } from "./app";

const port = process.env.PORT || 4000;
AppServer().listen(port, () => {
  console.log("Running on port ", port);
});

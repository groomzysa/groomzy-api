import { AppServer } from "./app";

AppServer().listen(4000, () => {
  console.log("running at http://localhost:4000");
});

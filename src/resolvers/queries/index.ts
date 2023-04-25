import { operatingTimeQueries } from "./operatingTime";
import { providerQueries } from "./provider";
import { serviceQueries } from "./service";
import { socialQueries } from "./social";
import { userQueries } from "./user";

export default {
  ...userQueries,
  ...providerQueries,
  ...serviceQueries,
  ...operatingTimeQueries,
  ...socialQueries,
};

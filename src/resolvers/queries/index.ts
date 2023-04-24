import { operatingTimeQueries } from "./operatingTime";
import { providerQueries } from "./provider";
import { serviceQueries } from "./service";
import { socials } from "./socials";
import { user } from "./user";

export default {
  user,
  ...providerQueries,
  ...serviceQueries,
  ...operatingTimeQueries,
  socials,
};

import { contactMail } from "./contactMail";
import { operatingTimeMutations } from "./operatingTime";
import { providerMutations } from "./provider";
import { serviceMutations } from "./service";
import { socialMutations } from "./social";
import { staffMutations } from "./staff";
import { userMutations } from "./user";

export default {
  ...providerMutations,
  ...userMutations,
  ...serviceMutations,
  ...staffMutations,
  ...operatingTimeMutations,
  ...socialMutations,
  contactMail,
};

import { contactMail } from "./contactMail";
import { operatingTimesMutations } from "./operatingTime";
import { providerMutations } from "./provider";
import { serviceMutations } from "./service";
import { staffMutations } from "./staff";
import { userMutations } from "./user";

export default {
  ...providerMutations,
  ...userMutations,
  ...serviceMutations,
  ...staffMutations,
  ...operatingTimesMutations,
  contactMail,
};

import { commentMutations } from "./comment";
import { contactMail } from "./contactMail";
import { galleryMutations } from "./gallery";
import { operatingTimeMutations } from "./operatingTime";
import { providerMutations } from "./provider";
import { serviceMutations } from "./service";
import { socialMutations } from "./social";
import { staffMutations } from "./staff";
import { userMutations } from "./user";

export default {
  ...galleryMutations,
  ...providerMutations,
  ...userMutations,
  ...serviceMutations,
  ...staffMutations,
  ...operatingTimeMutations,
  ...socialMutations,
  ...commentMutations,
  contactMail,
};

import { addAccountAddress } from "./addAccountAddress";
import { addUser } from "./addUser";
import { requestPasswordReset } from "./requestPasswordReset";
import { signIn } from "./signIn";
import { updateAccount } from "./updateAccount";
import { updateAccountAddress } from "./updateAccountAddress";

export const userMutations = {
  addUser,
  signIn,
  updateAccount,
  addAccountAddress,
  updateAccountAddress,
  requestPasswordReset,
};

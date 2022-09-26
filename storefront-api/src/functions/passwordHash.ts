import bcrypt from "bcrypt";
import securityConfig from "../config/env/security.config";

export const hashThisPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password + securityConfig.PEPPER, salt);
  return hashedPassword;
};

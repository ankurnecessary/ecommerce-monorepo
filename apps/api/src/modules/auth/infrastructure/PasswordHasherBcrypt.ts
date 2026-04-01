import { PasswordHasher } from "@/modules/auth/application/ports/PasswordHasher.js";
import bcrypt from "bcrypt";

export const PasswordHasherBcrypt: PasswordHasher = {
  async compare(enteredPassword, storedPassword) {
    return await bcrypt.compare(enteredPassword, storedPassword);
  },
  async hash(enteredPassword) {
    return await bcrypt.hash(enteredPassword, 10);
  },
};

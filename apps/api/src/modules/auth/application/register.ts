import UserRepository from "@/modules/user/domain/UserRepository.js";
import { User } from "@/modules/user/domain/User.js";
import { ERROR_CODES, ERROR_MESSAGES } from "@/shared/config/constants.js";
import { HttpError } from "@/shared/errors/HttpError.js";
import { PasswordHasher } from "./ports/PasswordHasher.js";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async (
  userData: UserData,
  userRepo: UserRepository,
  hasher: Pick<PasswordHasher, "hash">,
) => {
  // Check for email duplication
  const user = await userRepo.findByEmail(userData.email);
  if (user) {
    throw new HttpError(
      409,
      ERROR_MESSAGES.DUPLICATE_EMAIL,
      ERROR_CODES.VALIDATION_ERROR,
    );
  }

  // Hash password
  const password = await hasher.hash(userData.password);

  const userToRegister = User.create({
    ...userData,
    password,
  });

  // Save userData in User table of database
  await userRepo.register(userToRegister);
};

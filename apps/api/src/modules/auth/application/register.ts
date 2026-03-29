import UserRepository from "@/modules/user/domain/UserRepository.js";
import { ERROR_CODES, ERROR_MESSAGES } from "@/shared/config/constants.js";
import { HttpError } from "@/shared/errors/HttpError.js";

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async (
  userData: UserData,
  userRepo: UserRepository,
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

  // Save userData in User table of database
};

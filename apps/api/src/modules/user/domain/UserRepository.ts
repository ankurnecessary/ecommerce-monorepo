import { UserRegistrationData } from "@/modules/auth/application/register.js";
import type { User } from "./User.js";

export default interface UserRepository {
  findByEmail: (email: string) => Promise<User | null>;
  register: (userData: UserRegistrationData) => Promise<User | null>;
}

import type { User } from "./User.js";

export default interface UserRepository {
  findByEmail: (email: string) => Promise<User | null>;
  register: (userData: User) => Promise<User | null>;
}

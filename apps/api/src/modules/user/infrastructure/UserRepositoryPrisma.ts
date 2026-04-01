import { prisma } from "@/lib/prisma.js";
import { User } from "@/modules/user/domain/User.js";
import UserRepository from "@/modules/user/domain/UserRepository.js";

export const UserRepositoryPrisma: UserRepository = {
  async findByEmail(email: string) {
    const record = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!record) {
      return null;
    }

    return User.create({
      id: record.id,
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email,
      password: record.password,
      role: record.role,
    });
  },
  async register(userData: User) {
    const record = await prisma.user.create({
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
      },
    });

    return User.create({
      id: record.id,
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email,
      password: record.password,
      role: record.role,
    });
  },
};

import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../../../src/lib/prisma.js", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

import { prisma } from "@/lib/prisma.js";
import { User } from "@/modules/user/domain/User.js";
import { UserRepositoryPrisma } from "@/modules/user/infrastructure/UserRepositoryPrisma.js";
import { UserRole } from "@/generated/prisma/enums.js";

describe("UserRepositoryPrisma", () => {
  const findUniqueMock = vi.mocked(prisma.user.findUnique);
  const createMock = vi.mocked(prisma.user.create);
  const validUserRecord: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    refreshToken: string | null;
    id: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string | null;
    updatedBy: string | null;
  } = {
    id: "user-1",
    firstName: "First",
    lastName: "Last",
    email: "user@example.com",
    password: "Hashed@123",
    role: "storeUser",
    refreshToken: null,
    createdBy: null,
    createdAt: new Date("2026-04-04T00:00:00.000Z"),
    updatedBy: null,
    updatedAt: new Date("2026-04-04T00:00:00.000Z"),
  };

  beforeEach(() => {
    findUniqueMock.mockReset();
    createMock.mockReset();
  });

  it("returns null when user is not found by email", async () => {
    findUniqueMock.mockResolvedValue(null);

    const result = await UserRepositoryPrisma.findByEmail(
      "missing@example.com",
    );

    expect(result).toBeNull();
    expect(findUniqueMock).toHaveBeenCalledWith({
      where: { email: "missing@example.com" },
    });
  });

  it("returns a User when found by email", async () => {
    findUniqueMock.mockResolvedValue(validUserRecord);

    const result = await UserRepositoryPrisma.findByEmail("user@example.com");

    expect(result).toBeInstanceOf(User);
    expect(result?.id).toBe("user-1");
    expect(result?.firstName).toBe("First");
    expect(result?.lastName).toBe("Last");
    expect(result?.email).toBe("user@example.com");
    expect(result?.password).toBe("Hashed@123");
    expect(result?.role).toBe("storeUser");
  });

  it("rethrows when finding a user by email fails", async () => {
    findUniqueMock.mockRejectedValue(new Error("Database unavailable"));

    await expect(
      UserRepositoryPrisma.findByEmail("user@example.com"),
    ).rejects.toThrow("Database unavailable");
  });

  it("throws when findByEmail receives invalid user data from prisma", async () => {
    findUniqueMock.mockResolvedValue({
      ...validUserRecord,
      email: "invalid-email",
    });

    await expect(
      UserRepositoryPrisma.findByEmail("user@example.com"),
    ).rejects.toThrow();
  });

  it("returns a user when a user is created", async () => {
    createMock.mockResolvedValue(validUserRecord);

    const result = await UserRepositoryPrisma.register({
      firstName: "First",
      lastName: "Last",
      email: "user@example.com",
      password: "Hashed@123",
    });
    expect(result).toBeInstanceOf(User);
    expect(result?.id).toBe("user-1");
    expect(result?.firstName).toBe("First");
    expect(result?.lastName).toBe("Last");
    expect(result?.email).toBe("user@example.com");
    expect(result?.password).toBe("Hashed@123");
    expect(result?.role).toBe("storeUser");
  });

  it("calls prisma create with the registration data", async () => {
    createMock.mockResolvedValue(validUserRecord);

    await UserRepositoryPrisma.register({
      firstName: "First",
      lastName: "Last",
      email: "user@example.com",
      password: "Hashed@123",
    });

    expect(createMock).toHaveBeenCalledWith({
      data: {
        firstName: "First",
        lastName: "Last",
        email: "user@example.com",
        password: "Hashed@123",
      },
    });
  });

  it("rethrows when creating a user fails", async () => {
    createMock.mockRejectedValue(new Error("Unique constraint failed"));

    await expect(
      UserRepositoryPrisma.register({
        firstName: "First",
        lastName: "Last",
        email: "user@example.com",
        password: "Hashed@123",
      }),
    ).rejects.toThrow("Unique constraint failed");
  });

  it("throws when register receives invalid user data from prisma", async () => {
    createMock.mockResolvedValue({
      ...validUserRecord,
      password: "weakpassword",
    });

    await expect(
      UserRepositoryPrisma.register({
        firstName: "First",
        lastName: "Last",
        email: "user@example.com",
        password: "Hashed@123",
      }),
    ).rejects.toThrow();
  });
});

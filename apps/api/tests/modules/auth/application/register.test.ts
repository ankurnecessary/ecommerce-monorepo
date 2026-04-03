import { describe, expect, it, vi } from "vitest";

import { register, type UserRegistrationData } from "@/modules/auth/application/register.js";
import { User } from "@/modules/user/domain/User.js";
import { ERROR_CODES, ERROR_MESSAGES } from "@/shared/config/constants.js";
import { HttpError } from "@/shared/errors/HttpError.js";

describe("register", () => {
  const userData: UserRegistrationData = {
    firstName: "First",
    lastName: "Last",
    email: "user@example.com",
    password: "Password@123",
  };

  it("hashes the password and registers a new user when the email does not exist", async () => {
    const userRepo = {
      findByEmail: vi.fn().mockResolvedValue(null),
      register: vi.fn().mockResolvedValue(null),
    };
    const hasher = {
      hash: vi.fn().mockResolvedValue("Hashed@123"),
    };

    await register(userData, userRepo as any, hasher);

    expect(userRepo.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(hasher.hash).toHaveBeenCalledWith(userData.password);
    expect(userRepo.register).toHaveBeenCalledTimes(1);

    const firstRegisterCall = userRepo.register.mock.calls[0];
    expect(firstRegisterCall).toBeDefined();
    if (!firstRegisterCall) {
      throw new Error("Expected register to be called once");
    }

    const [registeredUser] = firstRegisterCall as [User];
    expect(registeredUser.firstName).toBe(userData.firstName);
    expect(registeredUser.lastName).toBe(userData.lastName);
    expect(registeredUser.email).toBe(userData.email);
    expect(registeredUser.password).toBe("Hashed@123");
  });

  it("throws HttpError when the email is already registered", async () => {
    const existingUser = User.create({
      id: "user-1",
      firstName: "First",
      lastName: "Last",
      email: "user@example.com",
      password: "Hashed@123",
      role: "customer",
    });
    const userRepo = {
      findByEmail: vi.fn().mockResolvedValue(existingUser),
      register: vi.fn(),
    };
    const hasher = {
      hash: vi.fn(),
    };

    try {
      await register(userData, userRepo as any, hasher);
      throw new Error("Expected register to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect((error as HttpError).statusCode).toBe(409);
      expect((error as HttpError).code).toBe(ERROR_CODES.VALIDATION_ERROR);
      expect((error as HttpError).message).toBe(ERROR_MESSAGES.DUPLICATE_EMAIL);
    }

    expect(userRepo.findByEmail).toHaveBeenCalledWith(userData.email);
    expect(hasher.hash).not.toHaveBeenCalled();
    expect(userRepo.register).not.toHaveBeenCalled();
  });

  it("rethrows when hashing the password fails", async () => {
    const userRepo = {
      findByEmail: vi.fn().mockResolvedValue(null),
      register: vi.fn(),
    };
    const hasher = {
      hash: vi.fn().mockRejectedValue(new Error("Hashing failed")),
    };

    await expect(register(userData, userRepo as any, hasher)).rejects.toThrow(
      "Hashing failed",
    );

    expect(userRepo.register).not.toHaveBeenCalled();
  });

  it("rethrows when persisting the new user fails", async () => {
    const userRepo = {
      findByEmail: vi.fn().mockResolvedValue(null),
      register: vi.fn().mockRejectedValue(new Error("Insert failed")),
    };
    const hasher = {
      hash: vi.fn().mockResolvedValue("Hashed@123"),
    };

    await expect(register(userData, userRepo as any, hasher)).rejects.toThrow(
      "Insert failed",
    );
  });
});

import { describe, expect, it, vi } from "vitest";

import { login } from "@/modules/auth/application/login.js";
import { User } from "@/modules/user/domain/User.js";
import { ERROR_CODES, ERROR_MESSAGES } from "@/shared/config/constants.js";
import { HttpError } from "@/shared/errors/HttpError.js";

describe("login", () => {
  it("throws when user is not found", async () => {
    const userRepo = {
      findByEmail: vi.fn().mockResolvedValue(null),
    };
    const authRepo = {
      saveRefreshToken: vi.fn(),
    };
    const hasher = {
      compare: vi.fn(),
    };
    const tokenService = {
      generateAccessToken: vi.fn(),
      generateRefreshToken: vi.fn(),
    };

    try {
      await login(
        "missing@example.com",
        "Password@123",
        userRepo,
        authRepo,
        hasher,
        tokenService,
      );
      throw new Error("Expected login to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect((error as HttpError).statusCode).toBe(401);
      expect((error as HttpError).code).toBe(ERROR_CODES.INVALID_CREDENTIALS);
      expect((error as HttpError).message).toBe(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
      );
    }

    expect(userRepo.findByEmail).toHaveBeenCalledWith("missing@example.com");
    expect(hasher.compare).not.toHaveBeenCalled();
    expect(authRepo.saveRefreshToken).not.toHaveBeenCalled();
  });

  it("throws when password is invalid", async () => {
    const user = User.create({
      id: "user-1",
      firstName: "First",
      lastName: "Last",
      email: "user@example.com",
      password: "Hashed@123",
      role: "customer",
    });
    const userRepo = {
      findByEmail: vi.fn().mockResolvedValue(user),
    };
    const authRepo = {
      saveRefreshToken: vi.fn(),
    };
    const hasher = {
      compare: vi.fn().mockResolvedValue(false),
    };
    const tokenService = {
      generateAccessToken: vi.fn(),
      generateRefreshToken: vi.fn(),
    };

    try {
      await login(
        "user@example.com",
        "bad-password",
        userRepo,
        authRepo,
        hasher,
        tokenService,
      );
      throw new Error("Expected login to throw");
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect((error as HttpError).statusCode).toBe(401);
      expect((error as HttpError).code).toBe(ERROR_CODES.INVALID_CREDENTIALS);
      expect((error as HttpError).message).toBe(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
      );
    }

    expect(hasher.compare).toHaveBeenCalledWith("bad-password", "Hashed@123");
    expect(authRepo.saveRefreshToken).not.toHaveBeenCalled();
  });

  it("returns tokens and saves refresh token when valid", async () => {
    const user = User.create({
      id: "user-1",
      firstName: "First",
      lastName: "Last",
      email: "user@example.com",
      password: "Hashed@123",
      role: "customer",
    });
    const userRepo = {
      findByEmail: vi.fn().mockResolvedValue(user),
    };
    const authRepo = {
      saveRefreshToken: vi.fn(),
    };
    const hasher = {
      compare: vi.fn().mockResolvedValue(true),
    };
    const tokenService = {
      generateAccessToken: vi.fn().mockReturnValue("access-token"),
      generateRefreshToken: vi.fn().mockReturnValue("refresh-token"),
    };

    const result = await login(
      "user@example.com",
      "password",
      userRepo,
      authRepo,
      hasher,
      tokenService,
    );

    expect(tokenService.generateAccessToken).toHaveBeenCalledWith(
      "user-1",
      "user@example.com",
    );
    expect(tokenService.generateRefreshToken).toHaveBeenCalledWith(
      "user-1",
      "user@example.com",
    );
    expect(authRepo.saveRefreshToken).toHaveBeenCalledWith(
      "user-1",
      "refresh-token",
    );
    expect(result).toEqual({
      id: "user-1",
      username: "user@example.com",
      accessToken: "access-token",
      refreshToken: "refresh-token",
    });
  });

  it("rethrows when saving the refresh token fails", async () => {
    const user = User.create({
      id: "user-1",
      firstName: "First",
      lastName: "Last",
      email: "user@example.com",
      password: "Hashed@123",
      role: "customer",
    });
    const userRepo = {
      findByEmail: vi.fn().mockResolvedValue(user),
    };
    const authRepo = {
      saveRefreshToken: vi.fn().mockRejectedValue(new Error("Save failed")),
    };
    const hasher = {
      compare: vi.fn().mockResolvedValue(true),
    };
    const tokenService = {
      generateAccessToken: vi.fn().mockReturnValue("access-token"),
      generateRefreshToken: vi.fn().mockReturnValue("refresh-token"),
    };

    await expect(
      login(
        "user@example.com",
        "password",
        userRepo,
        authRepo,
        hasher,
        tokenService,
      ),
    ).rejects.toThrow("Save failed");
  });
});

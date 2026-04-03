import { describe, expect, it, vi } from "vitest";

import { refresh } from "@/modules/auth/application/refresh.js";

describe("refresh", () => {
  it("returns null when refresh token is missing", async () => {
    const authRepo = {
      getRefreshTokenByUserId: vi.fn(),
      saveRefreshToken: vi.fn(),
    };
    const tokenService = {
      verifyRefreshToken: vi.fn(),
      generateAccessToken: vi.fn(),
      generateRefreshToken: vi.fn(),
    };

    const result = await refresh(undefined, authRepo, tokenService);

    expect(result).toBeNull();
    expect(tokenService.verifyRefreshToken).not.toHaveBeenCalled();
  });

  it("returns null when token payload is invalid", async () => {
    const authRepo = {
      getRefreshTokenByUserId: vi.fn(),
      saveRefreshToken: vi.fn(),
    };
    const tokenService = {
      verifyRefreshToken: vi.fn().mockReturnValue(null),
      generateAccessToken: vi.fn(),
      generateRefreshToken: vi.fn(),
    };

    const result = await refresh("bad-token", authRepo, tokenService);

    expect(result).toBeNull();
    expect(tokenService.verifyRefreshToken).toHaveBeenCalledWith("bad-token");
    expect(authRepo.getRefreshTokenByUserId).not.toHaveBeenCalled();
  });

  it("returns null when token is not the current stored token", async () => {
    const authRepo = {
      getRefreshTokenByUserId: vi.fn().mockResolvedValue("different-token"),
      saveRefreshToken: vi.fn(),
    };
    const tokenService = {
      verifyRefreshToken: vi.fn().mockReturnValue({
        id: "user-1",
        email: "user@example.com",
      }),
      generateAccessToken: vi.fn(),
      generateRefreshToken: vi.fn(),
    };

    const result = await refresh("refresh-token", authRepo, tokenService);

    expect(result).toBeNull();
    expect(authRepo.getRefreshTokenByUserId).toHaveBeenCalledWith("user-1");
    expect(authRepo.saveRefreshToken).not.toHaveBeenCalled();
  });

  it("returns null when no stored refresh token exists", async () => {
    const authRepo = {
      getRefreshTokenByUserId: vi.fn().mockResolvedValue(null),
      saveRefreshToken: vi.fn(),
    };
    const tokenService = {
      verifyRefreshToken: vi.fn().mockReturnValue({
        id: "user-1",
        email: "user@example.com",
      }),
      generateAccessToken: vi.fn(),
      generateRefreshToken: vi.fn(),
    };

    const result = await refresh("refresh-token", authRepo, tokenService);

    expect(result).toBeNull();
    expect(authRepo.getRefreshTokenByUserId).toHaveBeenCalledWith("user-1");
    expect(tokenService.generateAccessToken).not.toHaveBeenCalled();
    expect(tokenService.generateRefreshToken).not.toHaveBeenCalled();
  });

  it("rotates refresh token and returns new token pair", async () => {
    const authRepo = {
      getRefreshTokenByUserId: vi.fn().mockResolvedValue("refresh-token"),
      saveRefreshToken: vi.fn(),
    };
    const tokenService = {
      verifyRefreshToken: vi.fn().mockReturnValue({
        id: "user-1",
        email: "user@example.com",
      }),
      generateAccessToken: vi.fn().mockReturnValue("new-access-token"),
      generateRefreshToken: vi.fn().mockReturnValue("new-refresh-token"),
    };

    const result = await refresh("refresh-token", authRepo, tokenService);

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
      "new-refresh-token",
    );
    expect(result).toEqual({
      accessToken: "new-access-token",
      refreshToken: "new-refresh-token",
    });
  });

  it("rethrows when saving the rotated refresh token fails", async () => {
    const authRepo = {
      getRefreshTokenByUserId: vi.fn().mockResolvedValue("refresh-token"),
      saveRefreshToken: vi.fn().mockRejectedValue(new Error("Save failed")),
    };
    const tokenService = {
      verifyRefreshToken: vi.fn().mockReturnValue({
        id: "user-1",
        email: "user@example.com",
      }),
      generateAccessToken: vi.fn().mockReturnValue("new-access-token"),
      generateRefreshToken: vi.fn().mockReturnValue("new-refresh-token"),
    };

    await expect(refresh("refresh-token", authRepo, tokenService)).rejects.toThrow(
      "Save failed",
    );
  });
});

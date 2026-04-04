import { describe, expect, it, vi } from "vitest";

vi.mock("bcrypt", () => ({
  default: {
    compare: vi.fn(),
    hash: vi.fn(),
  },
}));

import bcrypt from "bcrypt";
import { PasswordHasherBcrypt } from "@/modules/auth/infrastructure/PasswordHasherBcrypt.js";

describe("PasswordHasherBcrypt", () => {
  it("delegates to bcrypt.compare", async () => {
    const compareMock = bcrypt.compare as unknown as ReturnType<typeof vi.fn>;
    compareMock.mockResolvedValue(true);

    const result = await PasswordHasherBcrypt.compare("plain", "hashed");

    expect(compareMock).toHaveBeenCalledWith("plain", "hashed");
    expect(result).toBe(true);
  });

  it("delegates to bcrypt.hash", async () => {
    const hashMock = bcrypt.hash as unknown as ReturnType<typeof vi.fn>;
    hashMock.mockResolvedValue("hashed-password");

    const result = await PasswordHasherBcrypt.hash("plain-password");

    expect(hashMock).toHaveBeenCalledWith("plain-password", 10);
    expect(result).toBe("hashed-password");
  });
});

import { describe, expect, it } from "vitest";

import { User } from "@/modules/user/domain/User.js";

describe("User", () => {
  it("creates a user with valid props", () => {
    const user = User.create({
      id: "user-1",
      firstName: "First",
      lastName: "Last",
      email: "user@example.com",
      password: "Secret@123",
      role: "customer",
    });

    expect(user.id).toBe("user-1");
    expect(user.email).toBe("user@example.com");
    expect(user.password).toBe("Secret@123");
    expect(user.role).toBe("customer");
  });

  it("throws when email is invalid", () => {
    expect(() =>
      User.create({
        id: "user-1",
        firstName: "First",
        lastName: "Last",
        email: "not-an-email",
        password: "secret",
        role: "customer",
      }),
    ).toThrow("Invalid email address");
  });
});

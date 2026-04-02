import { describe, expect, it } from "vitest";

import { User } from "@/modules/user/domain/User.js";
import { VALIDATION_ERROR_MESSAGES } from "@/shared/config/constants.js";

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

  it("creates a user without id", () => {
    const user = User.create({
      firstName: "First",
      lastName: "Last",
      email: "user@example.com",
      password: "Secret@123",
      role: "customer",
    });

    expect(user.email).toBe("user@example.com");
    expect(user.password).toBe("Secret@123");
    expect(user.role).toBe("customer");
  });

  it("throws error when try to access id of a user object who is without id", () => {
    const user = User.create({
      firstName: "First",
      lastName: "Last",
      email: "user@example.com",
      password: "Secret@123",
      role: "customer",
    });

    expect(() => user.id).toThrow("User id is not set");
  });

  it("throws when firstName is missing", () => {
    expect(() =>
      User.create({
        id: "user-1",
        firstName: "",
        lastName: "Last",
        email: "not-an-email",
        password: "Secret@123",
        role: "customer",
      }),
    ).toThrow(VALIDATION_ERROR_MESSAGES.INVALID_FIRSTNAME_REQUIRED);
  });

  it("throws when lastName is missing", () => {
    expect(() =>
      User.create({
        id: "user-1",
        firstName: "First",
        lastName: "",
        email: "not-an-email",
        password: "Secret@123",
        role: "customer",
      }),
    ).toThrow(VALIDATION_ERROR_MESSAGES.INVALID_LASTNAME_REQUIRED);
  });

  it("throws when email is invalid", () => {
    expect(() =>
      User.create({
        id: "user-1",
        firstName: "First",
        lastName: "Last",
        email: "not-an-email",
        password: "Secret@123",
        role: "customer",
      }),
    ).toThrow(VALIDATION_ERROR_MESSAGES.INVALID_EMAIL);
  });

  it("throws when lowercase letter is missing from the password", () => {
    expect(() =>
      User.create({
        id: "user-1",
        firstName: "First",
        lastName: "Last",
        email: "user@example.com",
        password: "SECRET@123",
        role: "customer",
      }),
    ).toThrow(VALIDATION_ERROR_MESSAGES.INVALID_PASSWORD_LOWERCASE);
  });

  it("throws when uppercase letter is missing from the password", () => {
    expect(() =>
      User.create({
        id: "user-1",
        firstName: "First",
        lastName: "Last",
        email: "user@example.com",
        password: "secret@123",
        role: "customer",
      }),
    ).toThrow(VALIDATION_ERROR_MESSAGES.INVALID_PASSWORD_UPPERCASE);
  });

  it("throws when number is missing from the password", () => {
    expect(() =>
      User.create({
        id: "user-1",
        firstName: "First",
        lastName: "Last",
        email: "user@example.com",
        password: "Secret@rrr",
        role: "customer",
      }),
    ).toThrow(VALIDATION_ERROR_MESSAGES.INVALID_PASSWORD_NUMBER);
  });

  it("throws when special character is missing from the password", () => {
    expect(() =>
      User.create({
        id: "user-1",
        firstName: "First",
        lastName: "Last",
        email: "user@example.com",
        password: "Secretrrr123",
        role: "customer",
      }),
    ).toThrow(VALIDATION_ERROR_MESSAGES.INVALID_PASSWORD_SPECIAL_CHARACTER);
  });

  it("returns firstName from getter", () => {
    const user = User.create({
      firstName: "First",
      lastName: "Last",
      email: "user@example.com",
      password: "Secre@trrr123",
      role: "customer",
    });

    expect(user.firstName).toBe("First");
  });

  it("returns lastName from getter", () => {
    const user = User.create({
      firstName: "First",
      lastName: "Last",
      email: "user@example.com",
      password: "Secre@trrr123",
      role: "customer",
    });

    expect(user.lastName).toBe("Last");
  });

  it("returns role from getter", () => {
    const user = User.create({
      id: "user-1",
      firstName: "First",
      lastName: "Last",
      email: "user@example.com",
      password: "Secre@trrr123",
      role: "admin",
    });

    expect(user.role).toBe("admin");
  });
});

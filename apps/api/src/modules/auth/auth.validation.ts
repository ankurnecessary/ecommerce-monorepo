import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { HttpError } from "@/shared/errors/HttpError.js";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  REGEX,
  VALIDATION_ERROR_MESSAGES,
} from "@/shared/config/constants.js";

// Validation for user registration data
const RegisterBodySchema = z.object({
  firstName: z
    .string()
    .min(1, VALIDATION_ERROR_MESSAGES.INVALID_FIRSTNAME_REQUIRED),
  lastName: z
    .string()
    .min(1, VALIDATION_ERROR_MESSAGES.INVALID_LASTNAME_REQUIRED),
  email: z.email(), // [ ] Check whether email become actually required
  password: z
    .string()
    .min(8, VALIDATION_ERROR_MESSAGES.INVALID_PASSWORD_LENGTH)
    .regex(
      REGEX.PASSWORD.LOWERCASE,
      VALIDATION_ERROR_MESSAGES.INVALID_PASSWORD_LOWERCASE,
    )
    .regex(
      REGEX.PASSWORD.UPPERCASE,
      VALIDATION_ERROR_MESSAGES.INVALID_PASSWORD_UPPERCASE,
    )
    .regex(REGEX.PASSWORD.NUMBER)
    .regex(
      REGEX.PASSWORD.SPECIAL_CHARACTER,
      VALIDATION_ERROR_MESSAGES.INVALID_PASSWORD_SPECIAL_CHARACTER,
    ),
});

export const validateRegisterBody = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const parsed = RegisterBodySchema.safeParse(req.body);

  if (!parsed.success) {
    const details = parsed.error.issues.map((issue) => ({
      field: issue.path.join(".") || "body",
      message: issue.message,
      code: issue.code,
    }));

    throw new HttpError(
      400,
      parsed.error.issues[0]?.message ??
        ERROR_MESSAGES.INVALID_REGISTRATION_REQUEST,
      ERROR_CODES.VALIDATION_ERROR,
      details,
    );
  }

  req.body = parsed.data;
  next();
};

// Validation for user login data
const LoginBodySchema = z.object({
  username: z.email(),
  password: z
    .string()
    .min(1, VALIDATION_ERROR_MESSAGES.INVALID_PASSWORD_REQUIRED),
});

export const validateLoginBody = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const parsed = LoginBodySchema.safeParse(req.body);

  if (!parsed.success) {
    const details = parsed.error.issues.map((issue) => ({
      field: issue.path.join(".") || "body",
      message: issue.message,
      code: issue.code,
    }));

    throw new HttpError(
      400,
      parsed.error.issues[0]?.message ?? ERROR_MESSAGES.INVALID_LOGIN_REQUEST,
      ERROR_CODES.VALIDATION_ERROR,
      details,
    );
  }

  req.body = parsed.data;
  next();
};

import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { HttpError } from "@/shared/errors/HttpError.js";
import { ERROR_CODES, ERROR_MESSAGES } from "@/shared/config/constants.js";

const RegisterBodySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email(), // [ ] Check whether email become actually required
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least 1 lowercase character")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase character")
    .regex(/\d/, "Password must contain at least 1 number")
    .regex(
      /[!@#$%^&*]/,
      "Password must contain at least 1 of !, @, #, $, %, ^, & or *",
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

const LoginBodySchema = z.object({
  username: z.email(),
  password: z.string().min(1, "Password is required"),
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

import { NextFunction, Request, Response } from "express";
import { HttpError } from "@/shared/errors/HttpError.js";
import { ERROR_CODES, ERROR_MESSAGES } from "@/shared/config/constants.js";

function sanitizeBody(body: Request["body"]) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return body ?? null;
  }

  const sanitized = { ...body } as Record<string, unknown>;

  if ("password" in sanitized) {
    sanitized.password = "[REDACTED]";
  }

  return sanitized;
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const errorSummary = {
    name: err.name,
    message: err.message,
    stack: err.stack,
  };

  if (err instanceof HttpError) {
    console.error("Handled HTTP error", {
      method: req.method,
      path: req.originalUrl,
      body: sanitizeBody(req.body),
      error: errorSummary,
      details: err.details ?? null,
    });

    return res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code,
        message: err.message,
        details: err.details ?? null,
      },
    });
  }

  // fallback for unknown errors
  console.error("Unhandled application error", {
    method: req.method,
    path: req.originalUrl,
    body: sanitizeBody(req.body),
    error: errorSummary,
  });

  return res.status(500).json({
    success: false,
    error: {
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      details: null,
    },
  });
}

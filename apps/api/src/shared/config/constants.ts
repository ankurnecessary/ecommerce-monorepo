export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: {
    LOWERCASE: /[a-z]/,
    UPPERCASE: /[A-Z]/,
    NUMBER: /\d/,
    SPECIAL_CHARACTER: /[!@#$%^&*]/,
  },
} as const;

export const MESSAGES = {
  SUCCESSFUL_USER_REGISTERED: "User created successfully",
  TOKEN_REFRESHED: "Tokens refreshed",
} as const;

export const VALIDATION_ERROR_MESSAGES = {
  INVALID_FIRSTNAME_REQUIRED: "First name is required",
  INVALID_LASTNAME_REQUIRED: "Last name is required",
  INVALID_EMAIL: "Invalid email address",
  INVALID_PASSWORD_REQUIRED: "Password is required",
  INVALID_PASSWORD_LENGTH: "Password must be at least 8 characters long",
  INVALID_PASSWORD_LOWERCASE:
    "Password must contain at least 1 lowercase character",
  INVALID_PASSWORD_UPPERCASE:
    "Password must contain at least 1 uppercase character",
  INVALID_PASSWORD_NUMBER: "Password must contain at least 1 number",
  INVALID_PASSWORD_SPECIAL_CHARACTER:
    "Password must contain at least 1 of !, @, #, $, %, ^, & or *",
  INVALID_ROLE_REQUIRED: "Role is required",
} as const;

export const ERROR_MESSAGES = {
  DUPLICATE_EMAIL: "Email already exists",
  INVALID_CREDENTIALS: "Invalid credentials",
  MISSING_ACCESS_TOKEN: "Missing access token",
  INVALID_REFRESH_TOKEN: "Invalid refresh token",
  INVALID_TOKEN_PAYLOAD: "Invalid token payload",
  INVALID_OR_EXPIRED_ACCESS_TOKEN: "Invalid or expired access token",
  INTERNAL_SERVER_ERROR: "Internal server error",
  INVALID_LOGIN_REQUEST: "Invalid login request",
  INVALID_REGISTRATION_REQUEST: "Invalid registration request",
} as const;

export type ErrorMessages =
  (typeof ERROR_MESSAGES)[keyof typeof ERROR_MESSAGES];

export const ERROR_CODES = {
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  INVALID_REFRESH_TOKEN: "INVALID_REFRESH_TOKEN",
  MISSING_ACCESS_TOKEN: "MISSING_ACCESS_TOKEN",
  INVALID_TOKEN_PAYLOAD: "INVALID_TOKEN_PAYLOAD",
  INVALID_OR_EXPIRED_ACCESS_TOKEN: "INVALID_OR_EXPIRED_ACCESS_TOKEN",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

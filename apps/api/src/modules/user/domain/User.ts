import { REGEX, VALIDATION_ERROR_MESSAGES } from "@/shared/config/constants.js";

export interface UserProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export class User {
  private constructor(private readonly props: UserProps) {}

  static create(props: UserProps): User {
    if (!props.firstName) {
      throw new Error(VALIDATION_ERROR_MESSAGES.INVALID_FIRSTNAME_REQUIRED);
    }
    if (!props.lastName) {
      throw new Error(VALIDATION_ERROR_MESSAGES.INVALID_LASTNAME_REQUIRED);
    }
    if (!REGEX.EMAIL.test(props.email)) {
      throw new Error(VALIDATION_ERROR_MESSAGES.INVALID_EMAIL);
    }
    if (!REGEX.PASSWORD.LOWERCASE.test(props.password)) {
      throw new Error(VALIDATION_ERROR_MESSAGES.INVALID_PASSWORD_LOWERCASE);
    }
    if (!REGEX.PASSWORD.UPPERCASE.test(props.password)) {
      throw new Error(VALIDATION_ERROR_MESSAGES.INVALID_PASSWORD_UPPERCASE);
    }
    if (!REGEX.PASSWORD.NUMBER.test(props.password)) {
      throw new Error(VALIDATION_ERROR_MESSAGES.INVALID_PASSWORD_NUMBER);
    }
    if (!REGEX.PASSWORD.SPECIAL_CHARACTER.test(props.password)) {
      throw new Error(
        VALIDATION_ERROR_MESSAGES.INVALID_PASSWORD_SPECIAL_CHARACTER,
      );
    }

    return new User({
      ...props,
    });
  }

  public get id(): string {
    return this.props.id;
  }

  public get email(): string {
    return this.props.email;
  }

  public get password(): string {
    return this.props.password;
  }

  public get role(): string {
    return this.props.role;
  }
}

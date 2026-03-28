import { REGEX, VALIDATION_ERROR_MESSAGES } from "@/shared/config/constants.js";

export interface UserProps {
  id: string;
  email: string;
  password: string;
  role: string;
}

export class User {
  private constructor(private readonly props: UserProps) {}

  static create(props: UserProps): User {
    if (!REGEX.EMAIL.test(props.email)) {
      throw new Error(VALIDATION_ERROR_MESSAGES.INVALID_EMAIL);
    }
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

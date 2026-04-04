export interface PasswordHasher {
  compare(enteredPassword: string, storedPassword: string): Promise<boolean>;
  hash(enteredPassword: string): Promise<string>;
}

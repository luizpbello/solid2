export interface PasswordProvider {
  hash(password: string): Promise<string>;
  compare(password: string, hash: String): Promise<boolean>;
}

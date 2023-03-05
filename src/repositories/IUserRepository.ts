import { User } from "../entities/User";

export interface IUserRepository {
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<void>;
  findAllUsers(): Promise<User[]>;
  deleteUser(id: number): Promise<void>;
  update(id: number, user: User): Promise<User>;
  findById(id: number): Promise<User>;
}

import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

export class InMemoryUsers implements IUserRepository {
  private users: User[] = [];

  async findAllUsers(): Promise<User[]> {
    return this.users;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async findById(id: number): Promise<User> {
    const user = this.users.find(user => user.id === id);
    if (!user) throw new Error("Usuário não encontrado");
    return user;
  }

  async deleteUser(id: number): Promise<void> {
    const userIndexToDelete = this.users.findIndex((user) => user.id === id);

    if (userIndexToDelete === -1) {
      throw new Error("Usuário não encontrado");
    }

    this.users.splice(userIndexToDelete, 1);
  }

  async update(id: number, userData: User): Promise<User> {
    const userIndexToUpdate = this.users.findIndex((user) => user.id === id);

    if (userIndexToUpdate === -1) {
      throw new Error("Usuário não encontrado");
    }

    const updatedUser = { ...this.users[userIndexToUpdate], ...userData };

    this.users[userIndexToUpdate] = updatedUser;

    return updatedUser;
  }
}

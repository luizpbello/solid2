import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAllUsers();
    return users;
  }
}

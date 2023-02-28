import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: ICreateUserRequestDTO) {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw new Error("Email já está em uso por outro usuário.");
    }

    const user = new User(data);


    await this.userRepository.save(user)
  }
}
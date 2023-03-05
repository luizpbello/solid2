import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

export default class EditUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: number, data: User): Promise<User> {
    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      throw new Error("Usuário não existe!");
    }

    const userToUpdate = {
      name: data.name ?? userExists.name,
      email: data.email ?? userExists.email,
      password: data.password ?? userExists.password,
    } as User;

    console.log('here', userToUpdate)
    const newUser = await this.userRepository.update(id, userToUpdate);
    return newUser;
  }
}

import { IUserRepository } from "../../repositories/IUserRepository";
import { IDeleteUserRequestDTO } from "./DeleteUserDTO";

export class DeleteUserUseCAse {
  constructor(private userRepository: IUserRepository) {}

  async execute(data:IDeleteUserRequestDTO): Promise<void> {
    const id = data
    await this.userRepository.deleteUser(id.id);
  }
}

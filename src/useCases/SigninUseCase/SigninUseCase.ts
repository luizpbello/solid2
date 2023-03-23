import { IPassportProvider } from "../../providers/IPassportProvider";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ISigninRequesteDTO } from "./SigninDTO";
import { JwtPayload } from "jsonwebtoken";

export class SigninUseCase {
  constructor(
    private iPassaportProvider: IPassportProvider,
    private iUserRepository: IUserRepository
  ) {}

  async execute(data: ISigninRequesteDTO) {
    const user = await this.iUserRepository.findByEmail(data.email);
    if (!user) {
      throw new Error("Usuário inexistente!");
    }

    const payload: JwtPayload = {
      sub: user.name,
      email: user.email,
    };

    const token = this.iPassaportProvider.generateToken(payload, "24h");

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return {
      user: userResponse,
      token,
    };
  }
}

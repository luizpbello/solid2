import { CreateUserUseCase } from "./CreateUserUseCase";
import { Request, Response } from "express";
import { ValididationProvider } from "../../providers/implementations/ValidationProvide";

export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private validationProvider: ValididationProvider
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, confirmPassword } = request.body;

    try {
      this.validationProvider.existsOrError(name, "Nome não informado!");
      this.validationProvider.existsOrError(email, "Email não informado!");
      this.validationProvider.isValidEmail(email,'Digite um email valido.')
      this.validationProvider.existsOrError(password, "Senha não informada!");
      this.validationProvider.existsOrError(
        confirmPassword,
        "Confirmação de senha não informado!"
      );
      this.validationProvider.isEqual(
        password,
        confirmPassword,
        "As senhas não conferem"
      );

      await this.createUserUseCase.execute({
        name,
        email,
        password,
      });
      return response.status(201).send("Usuário criado com sucesso");
    } catch (error) {
      const message = error.message || "Unexpected error.";
      return response.status(error.statusCode ?? 500).json({ message });
    }
  }
}

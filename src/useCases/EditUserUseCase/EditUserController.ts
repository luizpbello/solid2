import { User } from "@prisma/client";
import { Request, Response } from "express";
import { ValididationProvider } from "../../providers/implementations/ValidationProvide";
import EditUserUseCase from "./EdiUserUseCase";

export default class EditUserController {
  constructor(
    private editUserUseCase: EditUserUseCase,
    private validationProvider: ValididationProvider
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const id = +request.params.id;

    const data = { name, email, password } as User;

    try {
      this.validationProvider.existsOrError(name, "Nome não informado!");
      this.validationProvider.existsOrError(email, "Email não informado!");
      this.validationProvider.isValidEmail(email, "Digite um email valido.");
      this.validationProvider.existsOrError(password, "Senha não informada!");
   
      const user = await this.editUserUseCase.execute(id, data);
      return response.status(200).json({message:'Usuário alterado com sucesso!'});
    } catch (error) {
      return response
        .status(404)
        .json({ message: "Usuário não encontrado" || "Unxpected Error" });
    }
  }
}

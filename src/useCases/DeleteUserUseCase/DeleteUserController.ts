import { Request, Response } from "express";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params   

    
    try {
     
      await this.deleteUserUseCase.execute({id:+id});

      return response.status(204).send({message: 'Usuário removido com sucesso!'});
    } catch (error) {
      return response.status(404).json({ 
        message: 'Usuário não existe' || "Unxpected error.",
      });
    }
  }
}
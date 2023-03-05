import { Request, Response } from "express";
import { DeleteUserUseCAse } from "./DeleteUserUseCase";

export class DeleteUserController {
  constructor(private deleteUserUseCAse: DeleteUserUseCAse) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params   

    
    try {
     
      await this.deleteUserUseCAse.execute({id:+id});

      return response.status(204).send();
    } catch (error) {
      return response.status(404).json({ 
        message: 'Usuário não existe' || "Unxpected error.",
      });
    }
  }
}
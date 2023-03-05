import { Request, Response } from "express";
import { GetUserUseCase } from "./GetUserUseCase";

export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const users = await this.getUserUseCase.execute()
      return response.status(201).json(users)
    } catch (error) {
      return response.status(400).json({
        message:error.message || 'Erro inexperado.'
      })
    }
  }
}

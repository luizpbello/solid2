import { CreateUserUseCase } from "./CreateUserUseCase";
import { Request, Response } from "express";


export class CreateUserController{
    constructor(private createUserUseCase: CreateUserUseCase){}

    async handle(request: Request, response: Response):Promise<Response>{
        const {name, email, password } = request.body

        await this.createUserUseCase.execute({
            name,
            email,
            password
        })

        try {
            return response.status(201).send('Usuário criado com sucesso')
        } catch (error) {
            return response.status(400).json({
                message: error.message || "Unxpected error."
            })
        }
    }
}
import { PostgresUserRepository } from "../../repositories/implementations/PostgresUserRepository";
import { GetUserController } from "./GetUserController";
import { GetUserUseCase } from "./GetUserUseCase";


const postgresUserRepository = new PostgresUserRepository()
const getUserUseCase = new GetUserUseCase(postgresUserRepository)
const getUserController = new GetUserController(getUserUseCase)

export { getUserUseCase, getUserController }
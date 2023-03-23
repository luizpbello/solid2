import { PostgresUserRepository } from "../../repositories/implementations/PostgresUserRepository"
import { DeleteUserController } from "./DeleteUserController"
import { DeleteUserUseCase } from "./DeleteUserUseCase"


const postgresUserRepository = new PostgresUserRepository()
const deleteUserUseCase = new DeleteUserUseCase(postgresUserRepository)
const deleteUserController = new DeleteUserController(deleteUserUseCase)


export { deleteUserController, deleteUserUseCase }
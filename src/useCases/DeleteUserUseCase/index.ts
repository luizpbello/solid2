import { PostgresUserRepository } from "../../repositories/implementations/PostgresUserRepository"
import { DeleteUserController } from "./DeleteUserController"
import { DeleteUserUseCAse } from "./DeleteUserUseCase"


const postgresUserRepository = new PostgresUserRepository()
const deleteUserUseCase = new DeleteUserUseCAse(postgresUserRepository)
const deleteUserController = new DeleteUserController(deleteUserUseCase)


export { deleteUserController, deleteUserUseCase }
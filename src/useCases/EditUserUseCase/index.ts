import { ValididationProvider } from "../../providers/implementations/ValidationProvide";
import { PostgresUserRepository } from "../../repositories/implementations/PostgresUserRepository";
import EditUserController from "./EditUserController";
import EditUserUseCase from "./EdiUserUseCase";


const postgresUserRepository = new PostgresUserRepository()
const editUserUseCase = new EditUserUseCase(postgresUserRepository)
const validationProvider = new ValididationProvider()
const editUserController = new EditUserController(editUserUseCase, validationProvider)

export {editUserController, editUserUseCase}
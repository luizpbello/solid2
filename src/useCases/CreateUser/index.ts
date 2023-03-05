import { ValididationProvider } from "../../providers/implementations/ValidationProvide";
import { PostgresUserRepository } from "../../repositories/implementations/PostgresUserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const postgresUserRepository = new PostgresUserRepository();
const createUserUseCase = new CreateUserUseCase(postgresUserRepository);
const validationProvider = new ValididationProvider()

const createUserController = new CreateUserController(createUserUseCase, validationProvider);

export { createUserController, createUserUseCase };

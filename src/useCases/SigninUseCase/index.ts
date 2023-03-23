import { PassportJwtProvider } from "../../providers/implementations/PassportJwtProvider";
import { ValididationProvider } from "../../providers/implementations/ValidationProvide";
import { PostgresUserRepository } from "../../repositories/implementations/PostgresUserRepository";
import { SigninController } from "./SigninController";
import { SigninUseCase } from "./SigninUseCase";


const postgresRepository = new PostgresUserRepository()
const passaportProvider = new PassportJwtProvider()
const signinUseCase = new SigninUseCase(passaportProvider, postgresRepository)
const validationProvider = new ValididationProvider()
const signinController = new SigninController(signinUseCase,validationProvider)

export {signinController, signinUseCase}
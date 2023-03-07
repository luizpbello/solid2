import { User } from "../entities/User";

export interface IPassportProvider {
    validateUser(email:string, password:string):Promise<any>;
    generateToken(payload: User):Promise<string>;
}
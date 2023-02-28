import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";


export class PostgresUserRepository implements IUserRepository{
    

    async findByEmail(email: string): Promise<User> {

       
    }


    async save(user: User): Promise<void> {
        
    }



}
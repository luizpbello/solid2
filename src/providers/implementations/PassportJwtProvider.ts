import { User } from '../../entities/User'
import { IUserRepository } from '../../repositories/IUserRepository'
import {IPassportProvider} from '../IPassportProvider'
import jwt from 'jsonwebtoken'

export class PassportJwtProvider implements IPassportProvider {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly secretKey = process.env.JWT_SECRET_KEY

    ){}
   async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findByEmail(email)

        if(!user){
            throw new Error('Email ou senha inválidos.')
        }

        if(user.password === password){
            return await this.generateToken(user)
        }

        throw new Error('Usuário ou senha inválidos.')
    }

   async generateToken(payload: User): Promise<string> {
        if(!this.secretKey){
            throw new Error('Erro de jwt')
        }

        // const token = jwt.sign(payload.toJSON(), this.secretKey, {
        //     expiresIn:'1h'
        // })
        return 'ok'
    }
}
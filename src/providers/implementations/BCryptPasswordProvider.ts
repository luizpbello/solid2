import * as bcrypt from 'bcrypt';
import { PasswordProvider } from '../IBCryptProvider';


export class BCryptPasswordProvider implements PasswordProvider {
    async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10)
        return bcrypt.hash(password, salt)
    }

    async compare(password: string, hash: string): Promise<boolean> {
        const result =  bcrypt.compare(password, hash)
        return result
    }
}
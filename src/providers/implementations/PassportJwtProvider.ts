import { IPassportProvider } from "../IPassportProvider";
import jwt from "jsonwebtoken";
import {JwtPayload} from 'jsonwebtoken'
import * as dotenv from 'dotenv';

dotenv.config()


export class PassportJwtProvider implements IPassportProvider {
  constructor(
    private readonly secretKey = process.env.JWT_SECRET_KEY
  ) {}

  generateToken(payload: JwtPayload, expiresIn: string): string {
    const token = jwt.sign(payload, this.secretKey, {expiresIn})
    return token
  }

  validateToken(token: string): JwtPayload {
    try {
      const payload = jwt.verify(token, this.secretKey) as JwtPayload;
      return payload
    } catch (error) {
      throw new Error('Invalid Token')
    }
  }
 
}

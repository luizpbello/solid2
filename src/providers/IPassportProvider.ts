import {JwtPayload} from 'jsonwebtoken'
export interface IPassportProvider {
  generateToken(payload: JwtPayload, expiresIn: string): string;
  validateToken(token: string): JwtPayload;
}

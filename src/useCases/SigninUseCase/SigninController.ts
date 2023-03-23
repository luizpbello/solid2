import { Request, Response } from "express";
import { ValididationProvider } from "../../providers/implementations/ValidationProvide";
import { SigninUseCase } from "./SigninUseCase";
import { SignInResponse } from './SigninResponseInterface';

export class SigninController {
  constructor(
    private signinUseCase: SigninUseCase,
    private validationProvider: ValididationProvider
  ) {}

  async handle(request: Request, response: Response): Promise<Response<SignInResponse>> {
    const { email, password } = request.body;

    try {
      this.validationProvider.existsOrError(email, "Email não informado");
      this.validationProvider.existsOrError(password, "Informe a senha");

      const { user, token } = await this.signinUseCase.execute({ email, password });

      return response.status(201).json({ user, token });
    } catch (error) {
      const message = error.message || "Unexpected error.";
      return response.status(error.statusCode ?? 500).json({ message });
    }
  }
}

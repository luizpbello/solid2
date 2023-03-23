import { describe, it, expect, beforeEach } from "vitest";
import { IPassportProvider } from "../../providers/IPassportProvider";
import { InMemoryUsers } from "../../repositories/in-memory/InMemoryUsers";
import { SigninUseCase } from "./SigninUseCase";
import { User } from "../../entities/User";
import { PassportJwtProvider } from "../../providers/implementations/PassportJwtProvider";

describe("SigninUseCase", () => {
  let inMemoryUsers: InMemoryUsers;
  let passportProvider: IPassportProvider;
  let usecase: SigninUseCase;

  beforeEach(() => {
    inMemoryUsers = new InMemoryUsers();
    passportProvider = new PassportJwtProvider();

    usecase = new SigninUseCase(passportProvider, inMemoryUsers);
  });

  it("should throw an error if user does not exist", async () => {
    const email = "test@test.com";
    const password = "123456";

    const executionPromise = usecase.execute({ email, password });

    await expect(executionPromise).rejects.toThrow(/Usuário inexistente/);
  });

  it("Deve retornar o usuário e o token", async () => {
    const name = "Test User";
    const email = "test@test.com";
    const password = "123456";

    const user = new User({ name, email, password });
    await inMemoryUsers.save(user);

    const response = await usecase.execute({ email, password });

    expect(response).haveOwnProperty("user");
    expect(response).haveOwnProperty("token");
  });
});

import { User } from "../../entities/User";
import { InMemoryUsers } from "../../repositories/in-memory/InMemoryUsers";
import { describe, beforeEach, expect, it } from "vitest";

describe("Testing delete users", () => {
  let repository: InMemoryUsers;

  beforeEach(() => {
    repository = new InMemoryUsers();
  });

  it("Should delete user by id", async () => {
    const user = new User({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123",
    });
    await repository.save(user);
    await repository.deleteUser(user.id);
    const result = await repository.findAllUsers();

    expect(result).toEqual([]);
  });

  it("Should return an erro when try delete a user not exists", async () => {
    await expect(repository.deleteUser(999)).rejects.toThrowError(
      "Usuário não encontrado"
    );
  });
});

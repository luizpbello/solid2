import { User } from "../../entities/User";
import { InMemoryUsers } from "../../repositories/in-memory/InMemoryUsers";
import { describe, beforeEach, expect, it } from "vitest";

describe("Testing editUser functions", () => {
  let repository: InMemoryUsers;

  beforeEach(() => {
    repository = new InMemoryUsers();
  });

  it("Should can update a user", async () => {
    const user = new User({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123",
    });
    await repository.save(user);

    const userData = new User({
      name: "Luiz",
      email: "luiz@luiz.com",
      password: "555",
    });
    await repository.update(user.id, userData);

    const userUpdated = await repository.findById(user.id);
    expect(userUpdated?.name).toBe("Luiz");
    expect(userUpdated?.email).toBe("luiz@luiz.com");
  });

  it("Should throw a error when try a update a no-existing user", async () => {
    await expect(
      repository.update(9999, { name: "aaa", email: "bbb", password: "123" })
    ).rejects.toThrowError("Usuário não encontrado");
  });
});

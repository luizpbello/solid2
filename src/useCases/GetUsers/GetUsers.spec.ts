import { User } from "../../entities/User";
import { InMemoryUsers } from "../../repositories/in-memory/InMemoryUsers";
import { describe, beforeEach, expect, it } from "vitest";

describe("Testing getUsers", () => {
  let repository: InMemoryUsers;

  beforeEach(() => {
    repository = new InMemoryUsers();
  });

  it("should return empty list when there are no users", async () => {
    const result = await repository.findAllUsers();

    expect(result).toEqual([]);
  });


  it("should find a user by email", async () => {
    const user = new User({ name: "John Doe", email: "johndoe@example.com", password:'123'  });
    await repository.save(user);

    const result = await repository.findByEmail("johndoe@example.com");
    expect(result).toEqual(user);
  });

  it("should return undefined when user is not found by email", async () => {
    const result = await repository.findByEmail("johndoe@example.com");
    expect(result).toBeUndefined();
  });

  it("should find a user by id", async () => {
    const user = new User({ name: "Joe Smith", email: "joesmith@example.com", password:'123'  });
    await repository.save(user);

    const result = await repository.findById(user.id);
    expect(result).toEqual(user);
  });

  it("should throw error when user is not found by id", async () => {
    await expect(repository.findById(999)).rejects.toThrowError(
      "Usuário não encontrado"
    );
  });
});

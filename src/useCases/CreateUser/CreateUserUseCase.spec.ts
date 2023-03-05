import { User } from "../../entities/User";
import { InMemoryUsers } from "../../repositories/in-memory/InMemoryUsers";
import { describe, beforeEach, expect, it } from "vitest";


describe('Testing createUser functions', () => {

  let repository : InMemoryUsers;

  beforeEach(() => {
    repository = new InMemoryUsers()
  })



  it('Should can add a user an array of users when saving it', async () => {
    const user = new User({name:'Luiz', email:'luiz@luiz.com', password:'123'})
    await repository.save(user)

    const result = await repository.findAllUsers()
    expect(result.length).toBe(1)
    expect(result[0]).toEqual(user)

  })
})
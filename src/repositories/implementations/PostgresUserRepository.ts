import { PrismaClient } from "@prisma/client";
import { User } from "../../entities/User";
import { BCryptPasswordProvider } from "../../providers/implementations/BCryptPasswordProvider";
import { IUserRepository } from "../../repositories/IUserRepository";

export class PostgresUserRepository implements IUserRepository {
  
  constructor(
    private prisma = new PrismaClient(),
    private passwordProvider = new BCryptPasswordProvider()
  ) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async findAllUsers(): Promise<User[]> {
    const prismaUsers = await this.prisma.user.findMany();

    return prismaUsers;
  }

  async save(user: User): Promise<void> {
    const { name, email, password } = user;
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new Error("Email já está em uso.");
    }

    const encryptedPassword = await this.passwordProvider.hash(password);

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: encryptedPassword,
      },
    });
  }

  async deleteUser(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async findById(id: number): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      return user;
    } catch (error) {
      throw new Error("Usuário não existe.");
    }
  }

  async update(id: number, userData: User): Promise<User> {
    
    const { password } = userData;

    if (password) {
      const encryptedPassword = await this.passwordProvider.hash(password);
      userData.password = encryptedPassword;
    }

    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: userData,
      });
      return updatedUser;
    } catch (error) {
      throw new Error("Não foi possível alterar o usuário.");
    }
  }
}

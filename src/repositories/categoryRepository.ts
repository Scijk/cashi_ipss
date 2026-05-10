import { PrismaClient } from '@prisma/client';
import { Category } from '@prisma/client';

const prisma = new PrismaClient();

export class CategoryRepository {
  async findAll(): Promise<Category[]> {
    return prisma.category.findMany();
  }

  async findById(id: number): Promise<Category | null> {
    return prisma.category.findUnique({ where: { id } });
  }

  async create(data: { name: string }): Promise<Category> {
    return prisma.category.create({ data });
  }

  async update(id: number, data: Partial<{ name: string }>): Promise<Category> {
    return prisma.category.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Category> {
    return prisma.category.delete({ where: { id } });
  }
}
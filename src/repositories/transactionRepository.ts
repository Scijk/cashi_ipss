import { PrismaClient } from '@prisma/client';
import { Transaction } from '@prisma/client';

const prisma = new PrismaClient();

export class TransactionRepository {
  async findAll(): Promise<Transaction[]> {
    return prisma.transaction.findMany({ include: { category: true } });
  }

  async findById(id: number): Promise<Transaction | null> {
    return prisma.transaction.findUnique({ where: { id }, include: { category: true } });
  }

  async create(data: { amount: number; type: string; description?: string; date: Date; categoryId: number }): Promise<Transaction> {
    return prisma.transaction.create({ data, include: { category: true } });
  }

  async update(id: number, data: Partial<{ amount: number; type: string; description?: string; date: Date; categoryId: number }>): Promise<Transaction> {
    return prisma.transaction.update({ where: { id }, data, include: { category: true } });
  }

  async delete(id: number): Promise<Transaction> {
    return prisma.transaction.delete({ where: { id } });
  }

  async getBalance(): Promise<number> {
    const transactions = await prisma.transaction.findMany();
    return transactions.reduce((balance, t) => {
      return t.type === 'income' ? balance + t.amount : balance - t.amount;
    }, 0);
  }
}
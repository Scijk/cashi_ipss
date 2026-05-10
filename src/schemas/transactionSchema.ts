import { z } from 'zod';

export const transactionSchema = z.object({
  id: z.number().int().positive().optional(),
  amount: z.number().positive(),
  type: z.enum(['income', 'expense']),
  description: z.string().optional(),
  date: z.string().datetime(), // ISO string
  categoryId: z.number().int().positive(),
});

export const transactionCreateSchema = transactionSchema.omit({ id: true });
export const transactionUpdateSchema = transactionSchema.partial();
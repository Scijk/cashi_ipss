import { z } from 'zod';

export const categorySchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().min(1).max(100),
});

export const categoryCreateSchema = categorySchema.omit({ id: true });
export const categoryUpdateSchema = categorySchema.partial();
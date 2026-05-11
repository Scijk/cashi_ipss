import { Hono } from 'hono';
import { CategoryRepository } from '../repositories/categoryRepository';
import { categoryCreateSchema, categoryUpdateSchema } from '../schemas/categorySchema';

const categoryRepo = new CategoryRepository();

export const categoryController = new Hono();

categoryController.get('/', async (c) => {
  const categories = await categoryRepo.findAll();
  if (!categories || categories.length === 0) {
    return c.json({ message: 'No categories found', data: [] }, 200);
  }
  return c.json(categories);
});

categoryController.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.json({ error: 'Invalid ID' }, 400);
  const category = await categoryRepo.findById(id);
  if (!category) return c.json({ error: 'Category not found' }, 404);
  return c.json(category);
});

categoryController.post('/', async (c) => {
  const body = await c.req.json();
  const parsed = categoryCreateSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error }, 400);
  const category = await categoryRepo.create(parsed.data);
  return c.json(category, 201);
});

categoryController.patch('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.json({ error: 'Invalid ID' }, 400);
  const body = await c.req.json();
  const parsed = categoryUpdateSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error }, 400);
  const category = await categoryRepo.update(id, parsed.data);
  return c.json(category);
});

categoryController.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.json({ error: 'Invalid ID' }, 400);
  const category = await categoryRepo.findById(id);
  if (!category) return c.json({ error: 'Category not found' }, 404);
  
  // Check if there are any transactions associated with this category
  const transactionsCount = await categoryRepo.countTransactionsByCategory(id);
  if (transactionsCount > 0) {
    return c.json({ 
      error: 'Cannot delete category that has associated transactions', 
      message: `This category has ${transactionsCount} transaction(s)` 
    }, 409);
  }
  
  const deletedCategory = await categoryRepo.delete(id);
  return c.json(deletedCategory);
});
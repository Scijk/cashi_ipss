import { Hono } from 'hono';
import { TransactionRepository } from '../repositories/transactionRepository';
import { transactionCreateSchema, transactionUpdateSchema } from '../schemas/transactionSchema';

const transactionRepo = new TransactionRepository();

export const transactionController = new Hono();

transactionController.get('/', async (c) => {
  const transactions = await transactionRepo.findAll();
  return c.json(transactions);
});

transactionController.get('/balance', async (c) => {
  const summaries = await transactionRepo.getTransactionSummaries();
  const totalIncome = summaries
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = summaries
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;
  return c.json({ totalIncome, totalExpense, balance });
});

transactionController.get('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.json({ error: 'Invalid ID' }, 400);
  const transaction = await transactionRepo.findById(id);
  if (!transaction) return c.json({ error: 'Transaction not found' }, 404);
  return c.json(transaction);
});

transactionController.post('/', async (c) => {
  const body = await c.req.json();
  const parsed = transactionCreateSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error }, 400);
  const transaction = await transactionRepo.create({
    ...parsed.data,
    date: new Date(parsed.data.date),
  });
  return c.json(transaction, 201);
});

transactionController.put('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.json({ error: 'Invalid ID' }, 400);
  const body = await c.req.json();
  const parsed = transactionUpdateSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error }, 400);
  const updateData: any = { ...parsed.data };
  if (parsed.data.date) updateData.date = new Date(parsed.data.date);
  const transaction = await transactionRepo.update(id, updateData);
  return c.json(transaction);
});

transactionController.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.json({ error: 'Invalid ID' }, 400);
  const transaction = await transactionRepo.delete(id);
  return c.json(transaction);
});

transactionController.get('/balance', async (c) => {
  const balance = await transactionRepo.getBalance();
  return c.json({ balance });
});
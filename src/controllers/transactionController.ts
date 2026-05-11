import { Hono } from 'hono';
import { TransactionRepository } from '../repositories/transactionRepository';
import { CategoryRepository } from '../repositories/categoryRepository';
import { transactionCreateSchema, transactionUpdateSchema } from '../schemas/transactionSchema';

const transactionRepo = new TransactionRepository();
const categoryRepo = new CategoryRepository();

export const transactionController = new Hono();

transactionController.get('/', async (c) => {
  const transactions = await transactionRepo.findAll();
  if (!transactions || transactions.length === 0) {
    return c.json({ message: 'No transactions found', data: [] }, 200);
  }
  return c.json(transactions);
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
  
  // Validate that the category exists
  const category = await categoryRepo.findById(parsed.data.categoryId);
  if (!category) {
    return c.json({ 
      error: 'Category not found', 
      message: `Category with ID ${parsed.data.categoryId} does not exist` 
    }, 404);
  }
  
  const transaction = await transactionRepo.create({
    ...parsed.data,
    date: new Date(parsed.data.date),
  });
  return c.json(transaction, 201);
});

transactionController.patch('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.json({ error: 'Invalid ID' }, 400);
  
  // Check if transaction exists
  const existingTransaction = await transactionRepo.findById(id);
  if (!existingTransaction) {
    return c.json({ error: 'Transaction not found' }, 404);
  }
  
  const body = await c.req.json();
  const parsed = transactionUpdateSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error }, 400);
  
  // Validate that the category exists if categoryId is being updated
  if (parsed.data.categoryId) {
    const category = await categoryRepo.findById(parsed.data.categoryId);
    if (!category) {
      return c.json({ 
        error: 'Category not found', 
        message: `Category with ID ${parsed.data.categoryId} does not exist` 
      }, 404);
    }
  }
  
  const updateData: any = { ...parsed.data };
  if (parsed.data.date) updateData.date = new Date(parsed.data.date);
  const transaction = await transactionRepo.update(id, updateData);
  return c.json(transaction);
});

transactionController.delete('/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  if (isNaN(id)) return c.json({ error: 'Invalid ID' }, 400);
  
  const transaction = await transactionRepo.findById(id);
  if (!transaction) {
    return c.json({ error: 'Transaction not found' }, 404);
  }
  
  const deletedTransaction = await transactionRepo.delete(id);
  return c.json(deletedTransaction);
});

transactionController.get('/balance', async (c) => {
  const summaries = await transactionRepo.getTransactionSummaries();
  if (!summaries || summaries.length === 0) {
    return c.json({ 
      message: 'No transactions to calculate balance',
      totalIncome: 0, 
      totalExpense: 0, 
      balance: 0 
    }, 200);
  }
  const totalIncome = summaries
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = summaries
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;
  return c.json({ totalIncome, totalExpense, balance });
});
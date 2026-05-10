import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import categoryRoutes from './routes/categoryRoutes';
import transactionRoutes from './routes/transactionRoutes';

const app = new Hono();

app.get('/', (c) => c.text('Cashi API'));

app.route('/', categoryRoutes);
app.route('/', transactionRoutes);

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
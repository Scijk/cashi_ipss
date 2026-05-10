import { Hono } from 'hono';
import { transactionController } from '../controllers/transactionController';

const router = new Hono();

router.route('/transactions', transactionController);

export default router;
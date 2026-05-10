import { Hono } from 'hono';
import { categoryController } from '../controllers/categoryController';

const router = new Hono();

router.route('/categories', categoryController);

export default router;
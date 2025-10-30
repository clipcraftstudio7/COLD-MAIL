import { Router } from 'express';
import { getStats } from '../controllers/analyticsController.js';

const router = Router();

router.get('/', getStats);

export default router;


import { Router } from 'express';
import { listTemplates, createTemplate, getTemplate, updateTemplate, deleteTemplate } from '../controllers/templatesController.js';

const router = Router();

router.get('/', listTemplates);
router.post('/', createTemplate);
router.get('/:id', getTemplate);
router.put('/:id', updateTemplate);
router.delete('/:id', deleteTemplate);

export default router;


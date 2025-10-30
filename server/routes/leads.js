import { Router } from 'express';
import { listLeads, createLead, importLeads, updateLead, deleteLead } from '../controllers/leadsController.js';

const router = Router();

router.get('/', listLeads);
router.post('/', createLead);
router.post('/import', importLeads);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

export default router;


import { Router } from 'express';
const router = Router();
import { getContacts, addContact } from '../controllers/contactController.js';

router.get('/', getContacts);
router.post('/', addContact);

export default router;
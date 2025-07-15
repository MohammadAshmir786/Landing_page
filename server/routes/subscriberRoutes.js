import { Router } from 'express';
const router = Router();
import { getSubscribers, addSubscriber } from '../controllers/subscriberController.js';

router.get('/', getSubscribers);
router.post('/', addSubscriber);

export default router;
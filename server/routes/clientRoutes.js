import { Router } from 'express';
const router = Router();
import multer, { diskStorage } from 'multer';
import { getClients, addClient } from '../controllers/clientController.js';

const storage = diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get('/', getClients);
router.post('/', upload.single('image'), addClient);

export default router;
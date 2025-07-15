import { Router } from 'express';
const router = Router();
import multer, { diskStorage } from 'multer';
import { getProjects, addProject, updateProject, deleteProject } from '../controllers/projectController.js';

const storage = diskStorage({
  destination: 'uploads/',
  filename: (_, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get('/', getProjects);
router.post('/', upload.single('image'), addProject);
router.put('/:id', upload.single('image'), updateProject);
router.delete('/:id', deleteProject);

export default router;
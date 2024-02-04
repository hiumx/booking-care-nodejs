import express from 'express';
import specialtyController from '../controllers/SpecialtyController';

const router = express.Router();

router.get('/',specialtyController.getAllSpecialties);
router.post('/', specialtyController.createNewSpecialty);

export default router;
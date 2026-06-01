import { Router } from 'express';
import {
  getAllSchemes,
  getSchemeBySlug,
  getCategories,
} from '../controllers/schemesController.js';

const router = Router();

router.get('/categories', getCategories);
router.get('/:slug', getSchemeBySlug);
router.get('/', getAllSchemes);

export default router;

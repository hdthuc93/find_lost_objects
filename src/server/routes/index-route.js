import express from 'express';
import categoryRoute from './category-route';
import fieldDefineRoute from './field_define-route';

const router = express.Router();

router.use('/category', categoryRoute);
router.use('/field_define', fieldDefineRoute);

export default router;
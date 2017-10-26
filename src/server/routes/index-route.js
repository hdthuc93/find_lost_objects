import express from 'express';
import categoryRoute from './category-route';
import locationRoute from './location-route';
import fieldDefineRoute from './field_define-route';

const router = express.Router();

router.use('/category', categoryRoute);
router.use('/field_define', fieldDefineRoute);
router.use('/location', locationRoute);

export default router;
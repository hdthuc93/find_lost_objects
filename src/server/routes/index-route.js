import express from 'express';
import categoryRoute from './category-route';

const router = express.Router();

router.use('/category', categoryRoute);

export default router;
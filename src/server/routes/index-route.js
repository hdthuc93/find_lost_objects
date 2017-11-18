import express from 'express';
import categoryRoute from './category-route';
import locationRoute from './location-route';
import fieldDefineRoute from './field_define-route';
import itemRoute from './item-route';
import login from './login-route';
import register from './register-route';

const router = express.Router();

router.use('/categories', categoryRoute);
router.use('/field_defines', fieldDefineRoute);
router.use('/locations', locationRoute);
router.use('/items', itemRoute);
router.use('/logins', login);
router.use('/registers', register);
export default router;

import express from 'express';
import itemCtrl from '../controllers/item-controller';

const router = express.Router();

router.route('/')
    .post(
        itemCtrl.insertLostItem
    );

export default router;
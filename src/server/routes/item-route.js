import express from 'express';
import itemCtrl from '../controllers/item-controller';

const router = express.Router();

router.route('/')
    .post(
        itemCtrl.insertLostItem
    )
    .get(
    	itemCtrl.getAll
    )

router.route('/:type')
    .get(
    	itemCtrl.getAll
    )

router.route('/:itemId')
	.get(
		itemCtrl.getById
	)

export default router;
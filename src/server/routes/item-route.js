import express from 'express';
import itemCtrl from '../controllers/item-controller';

const router = express.Router();

router.route('/')
    .post(
        itemCtrl.insertItem
    )
    .get(
    	itemCtrl.getAll
    );

router.route('/:type')
    .get(
    	itemCtrl.getAll
    );

router.route('/id/:itemId')
	.get(
		itemCtrl.getById
	);

router.route('/matching/:itemId')
	.get(
		itemCtrl.recommendMatchingItems
    );


router.route('/matched')
    .post(
        itemCtrl.matchedItems
    );

router.route('/report')
    .post(
        itemCtrl.getItemReportByDay
    );

export default router;
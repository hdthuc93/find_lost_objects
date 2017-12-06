import express from 'express';
import categoryCtrl from '../controllers/category-controller';


const router = express.Router();

router.route('/')
    .get(
        categoryCtrl.getAll
    );

router.route('/:catId')
	.get(
		categoryCtrl.getById
    )
    .put(
        categoryCtrl.insertCategory
    );

export default router;
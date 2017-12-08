import express from 'express';
import categoryCtrl from '../controllers/category-controller';


const router = express.Router();

router.route('/')
    .get(
        categoryCtrl.getAll
    )
    .put(
        categoryCtrl.insertCategory
    );

router.route('/:catId')
	.get(
		categoryCtrl.getById
    )
    .delete(
        categoryCtrl.deleteCategory
    )
    .put(
        categoryCtrl.updateCategory
    );
    
export default router;
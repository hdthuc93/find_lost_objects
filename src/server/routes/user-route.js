import express from 'express';
import userCtrl from '../controllers/user-controller';


const router = express.Router();

router.route('/')
    .get(
        userCtrl.getAll
    )
    .put(
    	userCtrl.updateUser
    )
    .post(
    	userCtrl.insertUser
    )

router.route('/:userId')
	.get(
		userCtrl.getById
	);

export default router;
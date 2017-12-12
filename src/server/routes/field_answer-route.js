import express from 'express';
import fieldAnswerCtrl from '../controllers/field_answer-controller';


const router = express.Router();

router.route('/itemid/:itemId')
    .get(
        fieldAnswerCtrl.getFieldByItemId
    );

export default router;
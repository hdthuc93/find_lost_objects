import express from 'express';
import fieldAnswerCtrl from '../controllers/field_answer-controller';


const router = express.Router();

router.route('/itemid/:itemId')
    .get(
        fieldAnswerCtrl.getFieldByItemId
    );

router.route('/:field_id')
    .put(
        fieldAnswerCtrl.updateField
    );

export default router;
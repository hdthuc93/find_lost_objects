import express from 'express';
import fieldDefineCtrl from '../controllers/field_define-controller';


const router = express.Router();

router.route('/catid/:catId')
    .get(
        fieldDefineCtrl.getByCatId
    );

export default router;
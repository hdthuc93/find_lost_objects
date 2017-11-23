import express from 'express';
import trackItemCtrl from '../controllers/track_item-controller';


const router = express.Router();

router.route('/itemid/:itemId')
    .get(
        trackItemCtrl.getByItemId
    );

export default router;
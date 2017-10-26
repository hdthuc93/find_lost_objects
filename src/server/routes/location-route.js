import express from 'express';
import locationCtrl from '../controllers/location-controller';


const router = express.Router();

router.route('/')
    .get(
        locationCtrl.getAll
    )

export default router;
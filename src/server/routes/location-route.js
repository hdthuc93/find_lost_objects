import express from 'express';
import locationCtrl from '../controllers/location-controller';


const router = express.Router();

router.route('/')
.get(
    locationCtrl.getAll
)
.put(
    locationCtrl.updateLocation
);

router.route('/:locId')
    .get(
    locationCtrl.getById
    );

export default router;

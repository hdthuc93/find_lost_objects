import express from 'express';
import storageCtrl from '../controllers/storage-controller';


const router = express.Router();

router.route('/')
    .get(
    storageCtrl.getAll
    )
    .put(
    storageCtrl.updateStorage
    );
router.route('/:locId')
    .get(
    storageCtrl.getById
    );
export default router;

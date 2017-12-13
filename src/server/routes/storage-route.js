import express from 'express';
import storageCtrl from '../controllers/storage-controller';


const router = express.Router();

router.route('/')
    .get(
    storageCtrl.getAll
    )
    .put(
    storageCtrl.updateStorage
    )
    .post(
        storageCtrl.insertStorage
    )
router.route('/:locId')
    .get(
    storageCtrl.getById
    );
export default router;

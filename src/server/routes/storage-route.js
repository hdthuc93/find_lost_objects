import express from 'express';
import storageCtrl from '../controllers/storage-controller';


const router = express.Router();

router.route('/')
    .get(
        storageCtrl.getAll
    );

export default router;
import express from 'express';
import multer from 'multer';
import itemCtrl from '../controllers/item-controller';
import crypto from 'crypto';
import mime from 'mime'

const router = express.Router();
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/server/tmp/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
        });
    }
});
const upload = multer({ storage: storage });

router.route('/')
    .post(
        upload.single('image'),
        itemCtrl.insertItem
    )
    .get(
    	itemCtrl.getAll
    );

router.route('/:type')
    .get(
    	itemCtrl.getAll
    );

router.route('/id/:itemId')
	.get(
		itemCtrl.getById
	);

router.route('/matching/:itemId')
	.get(
		itemCtrl.recommendMatchingItems
    );

export default router;
import express from 'express';
import noteCtrl from '../controllers/note-controller';


const router = express.Router();

router.route('/')
	.post(
		noteCtrl.insertNote
	);

router.route('/:noteId')
    .get(
        noteCtrl.getById
    );

export default router;
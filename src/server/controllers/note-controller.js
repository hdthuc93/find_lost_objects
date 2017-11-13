import { sequelize, Sequelize } from '../models/index-model';
import Notes from '../models/note-model';
import Users from '../models/user-model';
import TrackItem from '../models/track_item-model';

function insertNote(req, res) {
    let insertNodeObj = {
        text: req.body.text,
        user_id: req.body.user_id,
        item_id: req.body.item_id,
    };

    return sequelize.transaction().then((t) => {
        Notes.create(insertNodeObj, { transaction: t })
        .then((result) => {
            if(result && result.pk_id) {
                var noteId = result.pk_id;

                let insertTrackObj = {
                    log_time: new Date(),
                    action: Number(req.body.action),
                    more_detail: req.body.more_detail,
                    item_id: req.body.item_id,
                    note_id: noteId
                };
                return TrackItem.create(insertTrackObj, { transaction: t });
            } else
                return Promise.resolve(false);
        })
        .then((result) => {
            if(result === false)
                return Promise.resolve(false);
            else
                return Promise.resolve(true);
        })
        .then((result) => {
            if(result) {
                t.commit();
                return res.status(200).json({
                    success: true,
                    message: "Insert note successfully"
                });
            } else {
                t.rollback();
                return res.status(200).json({
                    success: false,
                    message: "No record note inserted"
                });
            }
        })
        .catch((err) => {
            console.log(err);
            t.rollback();
            return res.status(500).json({
                success: false,
                message: "Failed to insert note"
            });
        });
    });
}

function getById(req, res) {
    let outData = [];
    let noteId = req.params['noteId'];

    Notes.findAll({
        where: {
            pk_id: noteId
        }
    })
    .then((notePool) => {
        let len = notePool.length;

        for(let i = 0; i < len; ++i) {
            outData.push({
                note_id: notePool[i]['pk_id'],
                text: notePool[i]['text'],
                user_id: notePool[i]['user_id'],
                item_id: notePool[i]['item_id'],
            });
        }

        return res.status(200).json({
            success: true,
            message: "Get Notes successfully",
            data: outData
        });
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to get Notes"
        });
    });
}

export default { insertNote, getById };
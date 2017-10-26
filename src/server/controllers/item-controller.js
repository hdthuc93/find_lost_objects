import { sequelize, Sequelize } from '../models/index-model';
import Item from '../models/item-model';
import FieldAnswer from '../models/field_answer-model';

function insertLostItem(req, res) {
    // type(0: lost, 1: found)
    // status(0: active, 1: returned, -1: expired)
    let insertItemObj = {
        category_id: Number(req.body.categoryId),
        location_id: Number(req.body.locationId),
        other_details: req.body.otherDetails,
        lost_at: new Date(req.body.lostAt), 
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email_address: req.body.emailAddress,
        contact_phone_no: req.body.contactPhoneNo,
        status: 0,
        type: 0,
        create_time: new Date()
    };

    let insertFieldAnswerObj = {
        answer_text: req.body.answerText,
        field_id: req.body.fieldId,
        item_id: -1
    };

    return sequelize.transaction().then((t) => {
        Item.create(insertItemObj, { transaction: t })
        .then((result) => {
            if(result && result.pk_id) {
                insertFieldAnswerObj.item_id = result.pk_id;
                return FieldAnswer.create(insertFieldAnswerObj, { transaction: t });
            } else
                return Promise.resolve(false);
        })
        .then((result) => {
            if(result && result.pk_id) {
                t.commit();
                return res.status(200).json({
                    success: true,
                    message: "Insert lost item successfully"
                });
            } else {
                t.rollback();
                return res.status(200).json({
                    success: false,
                    message: "No record to insert lost item"
                });
            }
        })
        .catch((err) => {
            console.log(err);
            t.rollback();
            return res.status(500).json({
                success: false,
                message: "Failed to insert lost item"
            });
        });
    });
}

export default { insertLostItem };
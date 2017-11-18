import { sequelize, Sequelize } from '../models/index-model';
import Item from '../models/item-model';
import FieldAnswer from '../models/field_answer-model';

function insertItem(req, res) {
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
        type: Number(req.body.type),
        create_time: new Date()
    };

    if (insertItemObj.type == 1) {
        insertItemObj.storege_location_id = req.body.storageId;
    }

    let fieldAnswersPool = req.body.fieldAnswersPool;
    let itemId = -1;
    return sequelize.transaction().then((t) => {
        Item.create(insertItemObj, { transaction: t })
            .then((result) => {
                if (result && result.pk_id) {
                    itemId = result.pk_id
                    let insertFieldAnswerObj = [];

                    for (let i = 0; i < fieldAnswersPool.length; ++i) {
                        insertFieldAnswerObj.push({
                            field_id: fieldAnswersPool[i].fieldDefineId,
                            item_id: result.pk_id,
                            answer_text: fieldAnswersPool[i].helpText
                        });
                    }
                    return FieldAnswer.bulkCreate(insertFieldAnswerObj, { transaction: t });
                } else
                    return Promise.resolve(false);
            })
            .then((result) => {
                if (result === false)
                    return Promise.resolve(false);
                else
                    return Promise.resolve(true);
            })
            .then((result) => {
                if (result) {
                    t.commit();
                    return res.status(200).json({
                        success: true,
                        message: "Insert item successfully"
                    });
                } else {
                    t.rollback();
                    return res.status(200).json({
                        success: false,
                        message: "No record item inserted"
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                t.rollback();
                return res.status(500).json({
                    success: false,
                    message: "Failed to insert item"
                });
            });
    });
}

function getAll(req, res) {
    let outData = [];

    Item.findAll()
        .then((itemPool) => {
            let len = itemPool.length;

            for (let i = 0; i < len; ++i) {
                outData.push({
                    itemId: itemPool[i]['pk_id'],
                    category_id: itemPool[i]['category_id'],
                    location_id: itemPool[i]['location_id'],
                    other_details: itemPool[i]['other_details'],
                    lost_at: itemPool[i]['lost_at'],
                    first_name: itemPool[i]['first_name'],
                    last_name: itemPool[i]['last_name'],
                    email_address: itemPool[i]['email_address'],
                    contact_phone_no: itemPool[i]['contact_phone_no'],
                    status: itemPool[i]['status'],
                    image: itemPool[i]['image'],
                    type: itemPool[i]['type'],
                    create_time: itemPool[i]['create_time'],
                    match_item_id: itemPool[i]['match_item_id'],
                    storege_location_id: itemPool[i]['storege_location_id'],
                });
            }

            return res.status(200).json({
                success: true,
                message: "Get items successfully",
                data: outData
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Failed to get items"
            });
        });
}

function getById(req, res) {
    let outData = [];
    let itemId = req.params['itemId'];

    Item.findAll({
        where: {
            pk_id: itemId
        }
    })
        .then((itemPool) => {
            let len = itemPool.length;

            for (let i = 0; i < len; ++i) {
                outData.push({
                    itemId: itemPool[i]['pk_id'],
                    category_id: itemPool[i]['category_id'],
                    location_id: itemPool[i]['location_id'],
                    other_details: itemPool[i]['other_details'],
                    lost_at: itemPool[i]['lost_at'],
                    first_name: itemPool[i]['first_name'],
                    last_name: itemPool[i]['last_name'],
                    email_address: itemPool[i]['email_address'],
                    contact_phone_no: itemPool[i]['contact_phone_no'],
                    status: itemPool[i]['status'],
                    image: itemPool[i]['image'],
                    type: itemPool[i]['type'],
                    create_time: itemPool[i]['create_time'],
                    match_item_id: itemPool[i]['match_item_id'],
                    storege_location_id: itemPool[i]['storege_location_id'],
                });
            }

            return res.status(200).json({
                success: true,
                message: "Get items successfully",
                data: outData
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Failed to get items"
            });
        });
}

export default { insertLostItem, getAll, getById };
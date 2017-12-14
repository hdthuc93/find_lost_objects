import { sequelize, Sequelize } from '../models/index-model';
import Item from '../models/item-model';
import Locations from '../models/location-model';
import Category from '../models/category-model';
import StorageLocation from '../models/storage_location-model';
import FieldAnswer from '../models/field_answer-model';
import dateUtils from '../utilities/date_times';
import TrackItem from '../models/track_item-model';
import AWS from 'aws-sdk';
import fs from 'fs';
import crypto from 'crypto';
import mime from 'mime'

AWS.config.loadFromPath('./src/server/configs/aws_const.json');

async function insertItem(req, res) {
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
        create_time: new Date(),
        image: ''
    };

    // console.log(req, req.);
    if(req.body.image) {
        let result = await uploadImg(req);
        if(result)
            insertItemObj.image = 'https://s3-ap-southeast-1.amazonaws.com/find-lost-object-img/' + result;
    }

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
                            answer_text: fieldAnswersPool[i].helpText||""
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
    let typeStr = req.params.type;
    let matched = req.query.matched;
    let cond = {};

    if(typeStr) {
        if(typeStr === "lost") {
            cond = { where: { type: 0 } };
            if(matched && matched === "true")
                cond.where.status = 1;
        } else if(typeStr === "found")
            cond = { where: { type: 1 } };
    }

    cond.include = [{ 
        model: Locations,
        required: true 
    }, { 
        model: Category,
        required: true 
    }, { 
        model: StorageLocation,
        // required: true 
    }];

    cond.order = [["create_time", "DESC"]];

    if(req.query.localId)
        cond.include[0].where = { pk_id: req.query.localId }

    if(req.query.catId)
        cond.include[1].where = { pk_id: req.query.catId }

    Item.findAll(cond)
    .then((itemPool) => {
        let len = itemPool.length;
        for(let i = 0; i < len; ++i) {
            let temp = {
                itemId: itemPool[i]['pk_id'],
                category_id: itemPool[i]['category_id'],
                category_name: itemPool[i]['Category']['name'],
                location_id: itemPool[i]['location_id'],
                location_name: itemPool[i]['location']['name'],
                image_link: itemPool[i]['image'],
                lost_or_found_at: dateUtils.changeToDDMMYYYY(itemPool[i]['lost_at'].toString()),
                fullName: itemPool[i]['last_name'] + " " + itemPool[i]['first_name'],
                status: itemPool[i]['status'],
                type: itemPool[i]['type'],
                storage_location_id: itemPool[i]['storege_location_id'],
                storage_location_name: "",
                match_item_id: itemPool[i]['match_item_id'] 
            };

            if(temp.storage_location_id)
                temp.storage_location_name = itemPool[i]['StorageLocation']['name'];

            outData.push(temp);
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

function recommendMatchingItems(req, res) {
    let lostItemId = req.params['itemId'];
    let sqlStr = `SELECT i2.pk_id as itemId, i2.category_id as categoryId, i2.location_id as locationId,
                    i2.lost_at as fday, i2.status
                    FROM Item as i1
                        INNER JOIN Item i2 ON i1.category_id = i2.category_id AND
                                                i1.location_id = i2.location_id AND
                                                i2.type = 1 AND
                                                i2.status = 0 AND
                                                i2.pk_id <> ?
                    WHERE i1.pk_id = ?
                    ORDER BY i2.lost_at DESC`;
    
    sequelize.query(sqlStr, {
        replacements: [lostItemId, lostItemId],
        type: sequelize.QueryTypes.SELECT
    })
    .then(item => {
        // let outData = [];
        // for(let i = 0; i < item.length; ++i)
        //     outData.push({ itemId: item[i].pk_id });

        return res.status(200).json({
            success: true,
            message: "Get matching items successfully",
            data: item
        });
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to matching item"
        });
    });
}

function matchedItems(req, res) {
    let item_src = req.body.item_src;
    let item_des = req.body.item_des;

    return sequelize.transaction().then((t) => {
        Item.update({ match_item_id: item_des, status: 1 }, { where: { pk_id: item_src } }, {transaction: t})
        .then((result) => {
            //khi cập nhật thành công item_src thì tiếp tục cập nhật item_des
            Item.update({ match_item_id: item_src, status: 1 }, { where: { pk_id: item_des } }, { transaction: t })
            .then((result) => {
                //khi cập nhật thành công item_des thì tạo track cho item_src
                let insertTrackObj = {
                    log_time: new Date(),
                    action: 1,
                    more_detail: 'Khớp với Item: ' + item_des,
                    item_id: item_src,
                };

                return TrackItem.create(insertTrackObj, { transaction: t });
            })
            .then((result) => {
                //khi tạo track cho item_src xong thì tạo track cho item_des
                let insertTrackObj = {
                    log_time: new Date(),
                    action: 1,
                    more_detail: 'Khớp với Item: ' + item_src,
                    item_id: item_des,
                };

                return TrackItem.create(insertTrackObj, { transaction: t });
            })
            .then((result) => {
                if (result) {
                    t.commit();
                    return res.status(200).json({
                        success: true,
                        message: "Update Match Item Success"
                    });
                } else {
                    t.rollback();
                    return res.status(200).json({
                        success: false,
                        message: "Update Math Item Fail"
                    });
                }
            })
            .catch((error) => {
                console.log("Update Matched Item Destination Fail");
                return res.status(500).json({
                    success: false,
                    message: "Update Matched Item Destination Fail"
                });
                t.rollback();
            });
        })
        .catch((error) => {
            console.log("Update Matched Item Source Fail");
            return res.status(500).json({
                success: false,
                message: "Update Matched Item Source Fail"
            });
        })
    });
}

function getItemReportByDay(req, res) {
    let day = req.body.day;
    let month = req.body.month;
    let year = req.body.year;
    console.log(1);
    let szQuery = `SELECT (COUNT(action) / 2) AS item_match FROM trackitem
                    WHERE DAY(log_time) = ? AND MONTH(log_time) = ? AND YEAR(log_time) = ? AND action = 1
                    GROUP BY action`;
    
    let result = {
        item_lost: 0,
        item_found: 0,
        item_match: 0,
    }

    sequelize.query(szQuery, {
        replacements: [day, month, year],
        type: sequelize.QueryTypes.SELECT
    })
    .then(item => {
        if (item[0] != null && item[0].item_match != null) {
            result.item_match = Math.floor(item[0].item_match);
        }

        szQuery = `SELECT type, count(pk_id) as count FROM item
                    WHERE DAY(create_time) = ? AND MONTH(create_time) = ? AND YEAR(create_time) = ?
                    GROUP BY type`;
        sequelize.query(szQuery, {
            replacements: [day, month, year],
            type: sequelize.QueryTypes.SELECT
        })
        .then((item) => {
            if (item[0] != null &&  item[0].count != null) {
                result.item_lost = item[0].count;
            }
            
            if (item[1] != null && item[1].count != null) {
                result.item_found = item[1].count;
            }

            return res.status(200).json({
                success: true,
                data: result,
            });
        });
        
    });
}

async function uploadImg(req) {
    try {
        let img = req.body.image;
        let s3Bucket = new AWS.S3({ params: { Bucket: 'find-lost-object-img' }});
        let imageExtension = img.split(';')[0].split(':')[1];
        imageExtension = mime.getExtension(imageExtension);
        let buffer = new Buffer(img.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        let t_name = await crypto.pseudoRandomBytes(16);
        let imgName = t_name.toString('hex') + Date.now() + '.' + imageExtension;
        let result = await s3Bucket.putObject({ Key: imgName, Body: buffer }).promise();
        return imgName;
    } catch(err) {
        console.log(err);
        return false;
    }
}

async function updateItem(req, res) {
    // type(0: lost, 1: found)
    // status(0: active, 1: returned, -1: expired)
    let itemId = req.body.itemId;
    let updateItemObj = {};

    if(req.body.categoryId)
        updateItemObj.category_id = Number(req.body.categoryId);

    if(req.body.locationId)
        updateItemObj.location_id = Number(req.body.locationId);
    
    if(req.body.otherDetails)
        updateItemObj.other_details = req.body.otherDetails;
    
    if(req.body.lostAt)
        updateItemObj.lost_at = new Date(req.body.lostAt);
    
    if(req.body.firstName)
        updateItemObj.first_name = req.body.firstName;

    if(req.body.lastName)
        updateItemObj.last_name = req.body.lastName;

    if(req.body.emailAddress)
        updateItemObj.email_address = req.body.emailAddress;

    if(req.body.contactPhoneNo)
        updateItemObj.contact_phone_no = req.body.contactPhoneNo;

    if(req.body.status)
        updateItemObj.status = Number(req.body.status);

    if(req.body.type)
        updateItemObj.type = Number(req.body.type);

    if(req.body.image) {
        let result = await uploadImg(req);
        if(result)
            updateItemObj.image = 'https://s3-ap-southeast-1.amazonaws.com/find-lost-object-img/' + result;
    }

    Item.update(updateItemObj, { where: { pk_id: itemId }})
    .then(result => {
        return res.status(200).json({
            success: true,
            message: "Update an item successfully"
        });
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Fail to update an item"
        });
    });
}

function getStatisticForIndexPage(req, res) {
    // type(0: lost, 1: found)
    let outData = {
        threeLost: [],
        threeFound: [],
        quanLost: 0,
        quanFound: 0,
        quanMatch: 0
    }

    Item.findAll({ 
        order: [ ['create_time', 'DESC'] ],
        include: [{
            model: Locations,
            required: true
        },{ 
            model: Category,
            required: true 
        }]
    })
    .then(itemPool => {
        for(let i = 0; i < itemPool.length; ++i) {
            if(itemPool[i]['type'] === 0) {
                outData.quanLost++;
                if(outData.threeLost.length < 3 && !itemPool[i]['match_item_id']) {
                    outData.threeLost.push({
                        itemId: itemPool[i]['pk_id'],
                        location_id: itemPool[i]['location_id'],
                        location_name: itemPool[i]['location']['name'],
                        category_id: itemPool[i]['category_id'],
                        category_name: itemPool[i]['Category']['name'],
                        lost_or_found_at: dateUtils.changeToDDMMYYYY(itemPool[i]['lost_at'].toString()),
                        status: itemPool[i]['status'],
                        type: itemPool[i]['type']
                    });
                }
            } else {
                outData.quanFound++;
                if(outData.threeFound.length < 3 && !itemPool[i]['match_item_id']) {
                    outData.threeFound.push({
                        itemId: itemPool[i]['pk_id'],
                        location_id: itemPool[i]['location_id'],
                        location_name: itemPool[i]['location']['name'],
                        category_id: itemPool[i]['category_id'],
                        category_name: itemPool[i]['Category']['name'],
                        lost_or_found_at: dateUtils.changeToDDMMYYYY(itemPool[i]['lost_at'].toString()),
                        status: itemPool[i]['status'],
                        type: itemPool[i]['type']
                    });
                }
            }

            if(itemPool[i]['match_item_id'])
                outData.quanMatch++;
        }

        return res.status(200).json({
            success: true,
            message: "Get statistic successfully",
            data: outData
        });
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Fail to get statistic"
        });
    })
}

export default { insertItem, getAll, getById, recommendMatchingItems, matchedItems, getItemReportByDay, updateItem, getStatisticForIndexPage };

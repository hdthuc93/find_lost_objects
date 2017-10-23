import Item from '../models/item-model';
import { convertToDDMMYYYY } from '../utilities/date_time_format'

function getAllItems(req, res) {
    Item.findAll()
    .then((itemResutls) => {
        let lstResults = [];
        let len = itemResutls.length;

        for(let i = 0; i < len; ++i) {
            lstResults.push({
                id: itemResutls[i]['ID'],
                name: itemResutls[i]['name'],
                price: itemResutls[i]['price'],
                size: itemResutls[i]['size'],
                color: itemResutls[i]['color'],
                createdDate: convertToDDMMYYYY(itemResutls[i]['createdDate'], '-'),
                expiredDate: convertToDDMMYYYY(itemResutls[i]['expiredDate'], '-')
            })
        }

        return res.status(200).json({
            success: true,
            message: "Get item(s) successfully",
            data: lstResults
        });
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to get item(s)"
        });
    });
}

function insertItem(req, res) {
    let reqObj = {
        name: req.body.name,
        price: req.body.price,
        size: req.body.size,
        color: req.body.color,
        createdDate: new Date()
    }

    if(req.body.expiredDate) {
        let exDate = req.body.expiredDate;
        exDate = exDate.split('-');
        reqObj.expiredDate = new Date(Number(exDate[2]), Number(exDate[1] -1), Number(exDate[0]) );
        console.log(exDate, reqObj.expiredDate);
    } else
        reqObj.expiredDate = new Date();

    Item.create(reqObj)
    .then((result) => {
        if(result && result.ID) {
            return res.status(200).json({
                success: true,
                message: "Insert new item successfully"
            });
        } else {
            return res.status(200).json({
                success: false,
                message: "No record item is inserted"
            });
        }
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to insert item"
        });
    });
}

function updateItem(req, res) {
    let itemId = req.body.id || req.query.id;
    let reqObj = {
        name: req.body.name || req.query.name,
        price: req.body.price || req.query.price,
        size: req.body.size || req.query.size,
        color: req.body.color || req.query.color,
    }

    if(req.body.expiredDate || req.query.expiredDate) {
        let exDate = req.body.expiredDate || req.query.expiredDate;
        exDate = exDate.split('-');
        reqObj.expiredDate = new Date(Number(exDate[2]), Number(exDate[1] -1), Number(exDate[0]) );
    }

    Item.update(reqObj, { where: { ID: itemId } })
    .then((result) => {
        if(result.length === 1 && result[0] > 0) {
            return res.status(200).json({
                success: true,
                message: "Update new item successfully"
            });
        } else {
            return res.status(200).json({
                success: false,
                message: "No record item is updated"
            });
        }
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to update item"
        });
    });
}

export default { getAllItems, insertItem, updateItem };
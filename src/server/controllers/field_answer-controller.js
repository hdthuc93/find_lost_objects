import FieldAnswer from '../models/field_answer-model';
import FieldDefine from '../models/field_define-model';
import Item from '../models/item-model';

function getFieldByItemId(req, res) {
    let outData = []
    let itemId = req.params['itemId'];

    FieldAnswer.findAll({
        where: { item_id: itemId },
        include: [{
            model: FieldDefine,
            // where: {
            //     pk_id: { $col: 'FieldAnswer.field_id' }
            // },
            required: true
        }]
    })
    .then(data => {
        let len = data.length;

        for(let i = 0; i < len; ++i) {
            outData.push({
                field_answer_id: data[i]['pk_id'],
                field_answer_text: data[i]['answer_text'],
                field_define_id: data[i]['FieldDefine']['pk_id'],
                field_define_text: data[i]['FieldDefine']['field_label']
            })
        }

        return res.status(200).json({
            success: true,
            message: "Get list field by item id successfully",
            data: outData
        });
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to get list field by item id"
        });
    });
}

function updateField(req, res) {
    let text = req.body['answer_text'];
    let fieldId = req.params['field_id'];

    FieldAnswer.update({ answer_text: text }, { where: { pk_id: fieldId }})
    .then(result => {
        return res.status(200).json({
            success: true,
            message: "Update an field successfully"
        });
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Fail to update a field"
        });
    });
}

export default { getFieldByItemId, updateField };
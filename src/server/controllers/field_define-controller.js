import FieldDefine from '../models/field_define-model';

function getByCatId(req, res) {
    let outData = [];
    let catId = req.params["catId"]

    FieldDefine.findAll({
        where: {
            category_id: catId
        }
    })
    .then((fieldDefinesPool) => {
        let len = fieldDefinesPool.length;

        for(let i = 0; i < len; ++i) {
            outData.push({
                fieldDefineId: fieldDefinesPool[i]['pk_id'],
                label: fieldDefinesPool[i]['field_label'],
                helpText: fieldDefinesPool[i]['help_text'],
                isRequired: fieldDefinesPool[i]['is_required'],
                catId: fieldDefinesPool[i]['category_id'],
                displayOrder: fieldDefinesPool[i]['display_order'],
            });
        }

        return res.status(200).json({
            success: true,
            message: "Get field defines by cat ID successfully",
            data: outData
        });
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to get field defines"
        });
    });
}

export default { getByCatId };
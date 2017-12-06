import { sequelize, Sequelize } from '../models/index-model';
import Category from '../models/category-model';
import FieldDefine from '../models/field_define-model';

function getAll(req, res) {
    let outData = [];

    Category.findAll()
    .then((categoriesPool) => {
        let len = categoriesPool.length;

        for(let i = 0; i < len; ++i) {
            outData.push({
                categoryId: categoriesPool[i]['pk_id'],
                categoryName: categoriesPool[i]['name'],
            });
        }

        return res.status(200).json({
            success: true,
            message: "Get categories successfully",
            data: outData
        });
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to get categories"
        });
    });
}

function getById(req, res) {
    let outData = [];
    let catId = req.params['catId'];

    Category.findAll({
        where: {
            pk_id: catId
        }
    })
    .then((categoriesPool) => {
        let len = categoriesPool.length;

        for(let i = 0; i < len; ++i) {
            outData.push({
                categoryId: categoriesPool[i]['pk_id'],
                categoryName: categoriesPool[i]['name'],
            });
        }

        return res.status(200).json({
            success: true,
            message: "Get categories successfully",
            data: outData
        });
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to get categories"
        });
    });
}
function insertCategory(req, res) {
    /*let insertCategoryObj = {
        fieldDefineId: Number(req.body.fieldDefineId),
        field_label: req.body.fieldLabel,
        help_text: req.body.helpText,
        is_required: Number(req.body.isRequired),
        category_id: Number(req.body.categoryId),
        display_order: Number(req.body.displayOrder)
    };*/

    let insertCategoryObj = {
       name: req.body.name
    };
    let fieldDefinePool = req.body.fieldDefinePool;
    return sequelize.transaction().then((t) => {
        Category.create(insertCategoryObj, { transaction: t })
            .then((result) => {
                if (result && result.pk_id) {
                    let insertFieldDefineObj = [];

                    for (let i = 0; i < fieldDefinePool.length; ++i) {
                        insertFieldDefineObj.push({
                   /*         field_id: fieldDefinePool[i].fieldDefineId,
                            item_id: result.pk_id,
                            answer_text: fieldDefinePool[i].helpText*/
                            field_label: fieldDefinePool[i].fieldLabel,
                            help_text: fieldDefinePool[i].helpText,
                            is_required: fieldDefinePool[i].isRequired,
                            category_id: result.pk_id,
                            display_order: fieldDefinePool[i].displayOrder
                        });
                    }
                    return FieldDefine.bulkCreate(insertFieldDefineObj, { transaction: t });
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
                        message: "Insert category successfully"
                    });
                } else {
                    t.rollback();
                    return res.status(200).json({
                        success: false,
                        message: "No record category inserted"
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                t.rollback();
                return res.status(500).json({
                    success: false,
                    message: "Failed to insert category"
                });
            });
    });
}

export default { getById, getAll, insertCategory };
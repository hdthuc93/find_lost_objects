import { sequelize, Sequelize } from '../models/index-model';
import Category from '../models/category-model';
import FieldDefine from '../models/field_define-model';

function getAll(req, res) {
    let outData = [];

    Category.findAll()
        .then((categoriesPool) => {
            let len = categoriesPool.length;

            for (let i = 0; i < len; ++i) {
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
    let FieldDefineObj = [];
    let catId = req.params['catId'];

    FieldDefine.findAll({
        where: {
            category_id: catId
        }
    })
        .then((fieldDefinesPool) => {
            let len = fieldDefinesPool.length;
            for (let i = 0; i < len; ++i) {
                FieldDefineObj.push({
                    pk_id: fieldDefinesPool[i]['pk_id'],
                    fieldLabel: fieldDefinesPool[i]['field_label'],
                    helpText: fieldDefinesPool[i]['help_text'],
                    isRequired: fieldDefinesPool[i]['is_required'],
                    category_id: fieldDefinesPool[i]['category_id'],
                    displayOrder: fieldDefinesPool[i]['display_order'],
                });
            }
        })
        .then(() => {
            return Category.findAll({
                where: {
                    pk_id: catId
                }
            })
        })
        .then((categoriesPool) => {
            let len = categoriesPool.length;

            for (let i = 0; i < len; ++i) {
                outData.push({
                    categoryId: categoriesPool[i]['pk_id'],
                    categoryName: categoriesPool[i]['name'],
                    fieldDefinesPool: FieldDefineObj
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

function deleteCategory(req, res) {

    let catId = req.params['catId'];

    FieldDefine.destroy({
        where: {
            category_id: catId
        }
    })
        .then(() => {
            Category.destroy({
                where: {
                    pk_id: catId
                }
            })
            return res.status(200).json({
                success: true,
                message: "Delete categories successfully",
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Failed to delete categories"
            });
        });
}
function updateCategory(req, res) {

    let updateCategoryObj = {
        name: req.body.name
    };
    let fieldDefinePool = req.body.fieldDefinePool;
    return sequelize.transaction().then((t) => {
        Category.update(updateCategoryObj, {
            where: {
                pk_id: req.params['catId']
            }
        }, { transaction: t })
            .then((result) => {
                if (result) {
                    let updateFieldDefineObj = [];
                    for (let i = 0; i < fieldDefinePool.length; ++i) {
                        updateFieldDefineObj.push({
                            pk_id: fieldDefinePool[i].pk_id,
                            field_label: fieldDefinePool[i].fieldLabel,
                            help_text: fieldDefinePool[i].helpText,
                            is_required: fieldDefinePool[i].isRequired,
                            display_order: fieldDefinePool[i].displayOrder,
                            category_id: req.params['catId']
                        });
                    }
                    let promise = [];
                    for (let element of updateFieldDefineObj) {
                        if (element.pk_id == null) {
                            promise.push(FieldDefine.create(element, { transaction: t }));
                        }
                        else {
                            promise.push(FieldDefine.update(element, {
                                where: {
                                    category_id: req.params['catId'],
                                    pk_id: element.pk_id
                                }
                            }, { transaction: t }));
                        }
                    }
                    return Promise.all(promise);
                } else
                    return Promise.resolve(false);
            })
            .then((result) => {
                if (result) {
                    t.commit();
                    return res.status(200).json({
                        success: true,
                        message: "update category successfully"
                    });
                } else {
                    t.rollback();
                    return res.status(200).json({
                        success: false,
                        message: "No record category update"
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                t.rollback();
                return res.status(500).json({
                    success: false,
                    message: "Failed to update category"
                });
            });
    });
}

export default { getById, getAll, insertCategory, deleteCategory, updateCategory };
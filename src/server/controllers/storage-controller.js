import Storages from '../models/storage_location-model';

function getAll(req, res) {
    let outData = [];

    Storages.findAll()
        .then((StoragesPool) => {
            let len = StoragesPool.length;

            for (let i = 0; i < len; ++i) {
                outData.push({
                    storageId: StoragesPool[i]['pk_id'],
                    name: StoragesPool[i]['name'],
                    description: StoragesPool[i]['description'],
                });
            }

            return res.status(200).json({
                success: true,
                message: "Get storages successfully",
                data: outData
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Failed to get storages"
            });
        });
}

function getById(req, res) {
    let outData = [];
    let storageId = req.params['locId'];

    Storages.findAll({
        where: {
            pk_id: storageId
        }
    })
        .then((storagePool) => {
            let len = storagePool.length;

            for (let i = 0; i < len; ++i) {
                outData.push({
                    storageId: storagePool[i]['pk_id'],
                    name: storagePool[i]['name'],
                    description: storagePool[i]['description'],
                });
            }

            return res.status(200).json({
                success: true,
                message: "Get storages successfully",
                data: outData
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Failed to get storages"
            });
        });
}

function updateStorage(req, res) {
    let storageId = req.body.storageId;
    let obj = {
        name: req.body.name,
        description: req.body.description,
    };
    Storages.update(obj, { where: { pk_id: storageId } })
        .then((result) => {
            return res.status(200).json({
                success: true,
                message: "Cập nhật thông tin kho thành công"
            });
        })
        .catch((err) => {
            t.rollback();
            return res.status(500).json({
                success: false,
                message: "Cập nhật thông tin kho thất bại"
            });
        })
}
function insertStorage(req, res) {
    let insertLocationObj = {
        name: req.body.name,
        description: req.body.description
    };
    Storages.create(insertLocationObj)
        .then((data) => res.send({ success: true, message: 'Insert new storage successfully' }))
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Insert new storage Unsuccessfully"
            });
        });
}
export default { getAll, updateStorage, getById, insertStorage };

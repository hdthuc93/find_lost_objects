import Storages from '../models/storage_location-model';

function getAll(req, res) {
    let outData = [];
    
    Storages.findAll()
    .then((StoragesPool) => {
        let len = StoragesPool.length;

        for(let i = 0; i < len; ++i) {
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

export default { getAll };
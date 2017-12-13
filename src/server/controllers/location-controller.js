import Locations from '../models/location-model';

function getAll(req, res) {
    let outData = [];

    Locations.findAll()
        .then((LocationsPool) => {
            let len = LocationsPool.length;

            for (let i = 0; i < len; ++i) {
                outData.push({
                    locationId: LocationsPool[i]['pk_id'],
                    name: LocationsPool[i]['name'],
                    description: LocationsPool[i]['description'],
                });
            }

            return res.status(200).json({
                success: true,
                message: "Get locations successfully",
                data: outData
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Failed to get locations"
            });
        });
}

function getById(req, res) {
    let outData = [];
    let locId = req.params['locId'];

    Locations.findAll({
        where: {
            pk_id: locId
        }
    })
        .then((locationPool) => {
            let len = locationPool.length;

            for (let i = 0; i < len; ++i) {
                outData.push({
                    locationId: locationPool[i]['pk_id'],
                    name: locationPool[i]['name'],
                    description: locationPool[i]['description'],
                });
            }

            return res.status(200).json({
                success: true,
                message: "Get locations successfully",
                data: outData
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Failed to get locations"
            });
        });
}

function updateLocation(req, res) {
    let locationId = req.body.locationId;
    let obj = {
        name: req.body.name,
        description: req.body.description,
    };
    Locations.update(obj, { where: { pk_id: locationId } })
        .then((result) => {
            return res.status(200).json({
                success: true,
                message: "Cập nhật thông tin địa điểm thành công"
            });
        })
        .catch((err) => {
            t.rollback();
            return res.status(500).json({
                success: false,
                message: "Cập nhật thông tin địa điểm thất bại"
            });
        })

}

function insertLocation(req, res) {
    let insertLocationObj = {
        name: req.body.name,
        description: req.body.description
    };
    Locations.create(insertLocationObj)
        .then((data) => res.send({ success: true, message: 'Insert new Location successfully' }))
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Insert new Location Unsuccessfully"
            });
        });
}

export default { getById, getAll, updateLocation, insertLocation };

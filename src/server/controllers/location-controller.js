import Locations from '../models/location-model';

function getAll(req, res) {
    let outData = [];
    
    Locations.findAll()
    .then((LocationsPool) => {
        let len = LocationsPool.length;

        for(let i = 0; i < len; ++i) {
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

export default { getAll };
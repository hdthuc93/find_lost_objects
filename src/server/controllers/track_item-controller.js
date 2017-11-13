import TrackItem from '../models/track_item-model';

function getByItemId(req, res) {
    let outData = [];
    let itemId = req.params['itemId'];

    TrackItem.findAll({
        where: {
            item_id: itemId
        }
    })
    .then((trackItemPool) => {
        let len = trackItemPool.length;

        for(let i = 0; i < len; ++i) {
            outData.push({
                trackId: trackItemPool[i]['pk_id'],
                log_time: trackItemPool[i]['log_time'],
                action: trackItemPool[i]['action'],
                more_detail: trackItemPool[i]['more_detail'],
                item_id: trackItemPool[i]['item_id'],
                note_id: trackItemPool[i]['note_id'],
            });
        }

        return res.status(200).json({
            success: true,
            message: "Get TrackItem successfully",
            data: outData
        });
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to get TrackItem"
        });
    });
}

export default { getByItemId };
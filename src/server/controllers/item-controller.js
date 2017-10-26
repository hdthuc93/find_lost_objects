import Item from '../models/item-model';

function insertLostItem(req, res) {
    // type(0: lost, 1: found)
    // status(0: active, 1: returned, -1: expired)
    console.log(req.body);
    let insertObj = {
        category_id: Number(req.body.categoryId),
        location_id: Number(req.body.locationId),
        other_details: req.body.otherDetails,
        lost_at: new Date(req.body.lostAt), 
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email_address: req.body.emailAddress,
        contact_phone_no: req.body.contactPhoneNo,
        status: 0,
        type: 0,
        create_time: new Date()
    };

    Item.create(insertObj)
    .then((result) => {
        if(result && result.pk_id)
            return res.status(200).json({
                success: true,
                message: "Insert lost item successfully"
            });
        else
            return res.status(200).json({
                success: false,
                message: "No record to insert lost item"
            });
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to insert lost item"
        });
    });
}

export default { insertLostItem };
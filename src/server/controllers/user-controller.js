import Users from '../models/user-model';

function getAll(req, res) {
    let outData = [];

    Users.findAll()
    .then((userPool) => {
        let len = userPool.length;

        for(let i = 0; i < len; ++i) {
            outData.push({
                userId: userPool[i]['pk_id'],
                first_name: userPool[i]['first_name'],
                last_name: userPool[i]['last_name'],
                email: userPool[i]['email'],
                user_type: userPool[i]['user_type'],
                password: userPool[i]['password'],
            });
        }

        return res.status(200).json({
            success: true,
            message: "Get users successfully",
            data: outData
        });
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to get users"
        });
    });
}

function getById(req, res) {
    let outData = [];
    let userId = req.params['userId'];

    Users.findAll({
        where: {
            pk_id: userId
        }
    })
    .then((userPool) => {
        let len = userPool.length;

        for(let i = 0; i < len; ++i) {
            outData.push({
                userId: userPool[i]['pk_id'],
                first_name: userPool[i]['first_name'],
                last_name: userPool[i]['last_name'],
                email: userPool[i]['email'],
                user_type: userPool[i]['user_type'],
                password: userPool[i]['password'],
            });
        }

        return res.status(200).json({
            success: true,
            message: "Get user successfully",
            data: outData
        });
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to get user"
        });
    });
}

export default { getById, getAll };
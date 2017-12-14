import { sequelize, Sequelize } from '../models/index-model';
import Users from '../models/user-model';
import bcrypt from "bcrypt";

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

function updateUser(req, res) {
    let uId = req.body.userId;
    let obj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        user_type: req.body.user_type,
        password: req.body.password,
    };

    if (req.body.action == 'band') {
        if (obj.user_type == 0) obj.user_type = -1;
        else if (obj.user_type == -1) obj.user_type = 0;
    } else if (req.body.action == 'changepw') {
        var salt = bcrypt.genSaltSync(10);
        obj.password = bcrypt.hashSync(obj.password, salt);
    }

    let szQuery = `SELECT * FROM User WHERE email = ? AND pk_id <> ?`;
    
    sequelize.query(szQuery, {
        replacements: [obj.email, uId],
        type: sequelize.QueryTypes.SELECT
    })
    .then((result) => {
            if (result.length == 0) {
                sequelize.transaction().then((t) => {
                    Users.update(obj, {where: { pk_id: uId } }, { transaction: t })
                    .then((result) => {
                        t.commit();
                        return res.status(200).json({
                            success: true,
                            message: "Cập nhật thông tin thành công"
                        });
                    })
                    .catch((err) => {
                        t.rollback();
                        return res.status(500).json({
                            success: false,
                            message: "Update User Fail"
                        });
                    })
                });
            } else {
                return res.status(200).json({
                    sucess: false,
                    message: "Email đã có người sử dụng"
                });
            }
        });
        
}

function insertUser(req, res) {
  console.log(req.body);
  Users.findOne({ where: { email: req.body.email } })
    .then((user) => {
      let userInsert = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        user_type: req.body.user_type,
        email: req.body.email,
        password: req.body.password,
      };
      console.log(user);
      if (!user) {
        Users.create(userInsert)
          .then((data) => res.send({ success: true, message: 'Thêm mới thành công' }))
          .catch((err) => {
            console.log(err);
            return res.status(500).json({
              success: false,
              message: "Failed to insert user"
            });
          });
      } else {
        res.send({ success: false, message: 'Địa chỉ Email đã tồn tại.' });
      }
    })
}

export default { getById, getAll, updateUser, insertUser };
import Users from '../models/user-model';
import config from '../configs/const'
var jwt = require('jsonwebtoken');


function Login(req, res) {
    Users.findOne({ where: { email: req.body.Email } })
        .then((user) => {
            if (!user) {
                res.send({ success: false, msg: 'Authentication failed. User not found.' });
            } else {
                user.validPassword(req.body.Pass, (err, isValid) => {
                    if (err) {
                        console.log(err);
                    }
                    if (isValid) {
                        if (user.user_type == -1) {
                            return res.status(200).json({
                                success: false,
                                msg: 'Tài khoản của bạn đang bị khóa không thể tiến hành login'
                            });
                        }

                        let cert = config.secret;
                        let tokenJWT = jwt.sign({data : user}, cert);
                        res.send({ success: true,msg: "Login success", token: tokenJWT, name: user['first_name'] ,user_id: user['pk_id'],user_type: user['user_type'] });
                    }
                    else {
                        res.send({ success: false, msg: '"Tên đăng nhập hoặc mật khẩu không đúng, vui lòng thử lại."' });
                    }
                })
            }
        }).catch((err) => {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Failed to get user"
            });
        });
}

function Register(req, res) {
    console.log(req.body);
    Users.findOne({ where: { email: req.body.email } })
        .then((user) => {
            let userInsert = {
                first_name: req.body.FirstName,
                last_name: req.body.LastName,
                user_type: req.body.Type,
                email: req.body.Email,
                password: req.body.Pass
            };
            if (!user) {
                Users.create(userInsert)
                    .then((data) => res.send({ success: true, msg: 'Insert success' }))
                    .catch((err) => {
                        console.log(err);
                        return res.status(500).json({
                            success: false,
                            message: "Failed to insert user"
                        });
                    });
            } else {
                res.send({ success: false, msg: 'Email exists.' });
            }
        })
}


export default { Login, Register };

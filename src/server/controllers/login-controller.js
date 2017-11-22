import Users from '../models/user-model';
import config from '../configs/const'
var jwt = require('jsonwebtoken');


function Login(req, res) {
    Users.findOne({ where: {email: req.body.Email} })
        .then((user) => {
            if (!user) {
               res.send({success: false, msg: 'Authentication failed. User not found.'});
            }else {
                user.validPassword(req.body.Pass, (err, isValid) => {
                    if(err) {
                        console.log(err);
                    }
                    if(isValid) {
                        let cert = config.secret;
                        let tokenJWT = jwt.sign({data : user}, cert);
                        res.send({ success: true,msg: "Login success", token: tokenJWT, name: user['first_name'] ,user_id: user['pk_id'] });
                    }
                    else {
                        res.send({success: false, msg: 'Authentication failed. Wrong password.'});
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
    Users.findOne({ where: {email: req.body.email} })
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
                .then((data) =>  res.send({success: true, msg: 'Insert success'}))
                .catch((err) =>  {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Failed to insert user"
                });
            });
            }else {
               res.send({success: false, msg: 'Email exists.'});
            }
        })
}


export default { Login, Register };

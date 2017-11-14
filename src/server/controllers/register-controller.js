import Users from '../models/user-model';
import config from '../configs/const'
function Register(req, res) {
  console.log(req.body);
  Users.findOne({ where: { email: req.body.Email } })
    .then((user) => {
      let userInsert = {
        first_name: req.body.FirstName,
        last_name: req.body.LastName,
        user_type: req.body.Type,
        email: req.body.Email,
        password: req.body.Pass
      };
      console.log(user);
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


export default { Register };

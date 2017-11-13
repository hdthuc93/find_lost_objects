import express from 'express';
import loginCtrl from '../controllers/login-controller';
var passport = require('passport');  
const router = express.Router();

router.route('/')
    .post((req, res) => loginCtrl.Login(req,res));

router.route('/register')
    .post((req, res) => loginCtrl.Register(req,res));

router.route('/testAuthen')
    .post(passport.authenticate('jwt', { session: false }), (req, res) => { res.json({message: "Success! You can not see this without a token"})
    });

export default router;
import express from 'express';
import registerCtrl from '../controllers/register-controller';
const router = express.Router();

router.route('/')
  .post((req, res) => registerCtrl.Register(req, res));

export default router;

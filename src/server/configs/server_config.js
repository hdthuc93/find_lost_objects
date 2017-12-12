import express from 'express';
import morgan from 'morgan';
import routes from '../routes/index-route';
import bodyParser from 'body-parser';
import config from './const'
import passport from 'passport';
import strategy from './passport-config';
const app = express();

app.use(morgan('dev'))
app.use('/', express.static('./src/client'));
app.use('/', express.static('./bower_components'));
app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
require('./passport-config')(passport);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '../../../client/index.html');
});

app.use('/api', routes);

export default app;
import * as express from 'express';
import * as cors from 'cors';
import { Config } from '../config/app.config';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import { router } from './router';
import { fillDbWithTestData } from './dbInit';

const port: number = 3000;

const app: express.Application = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use('/backend', router);

mongoose.connect([Config.db.host, '/', Config.db.name].join(''), {});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.info(`Connected to ${Config.db.host}/${Config.db.name}`);
    fillDbWithTestData();
    app.listen(port, () => {
        console.log(`Listening at http://localhost:${port}/`);
    });
});

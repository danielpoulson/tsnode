import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

// Controllers (route handlers)
import * as homeController from './controllers/home';

// Create Express server
const app = express();
app.set('views', path.join(__dirname, '../views'));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

app.get('/', homeController.index);

export default app;

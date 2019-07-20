import express from 'express';
import session from 'express-session';
import mongo from 'connect-mongo';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import { MONGODB_URI, SESSION_SECRET } from './util/secrect';

const MongoStore = mongo(session);

// Controllers (route handlers)
import * as homeController from './controllers/home';

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;

mongoose
    .connect(mongoUrl, { useNewUrlParser: true })
    .then(() => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    })
    .catch(err => {
        console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
        // process.exit();
    });

app.set('views', path.join(__dirname, '../views'));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        store: new MongoStore({
            url: mongoUrl,
            autoReconnect: true,
        }),
    }),
);

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

app.get('/', homeController.index);

export default app;

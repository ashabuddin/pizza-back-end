const express = require('express')
const { APP_PORT, DB_URL  } = require('./config')
const app = express()
import path from 'path';
import errorHandler from './middlewares/errorHandler'
import routes from './routes/index'
import mongoose from 'mongoose';


// Database connection
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
//useFindAndModify: false,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});

global.appRoot = path.resolve(__dirname);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api',routes);
app.use('/uploads', express.static('uploads'));


app.use(errorHandler);

app.listen(APP_PORT, () => {
  console.log(`Example app listening at http://localhost:${APP_PORT}`)
})
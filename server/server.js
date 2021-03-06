const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const mongoDB = process.env.myMongoDb;
const PORT = process.env.PORT || 3000;

if (process.env.PORT && process.env.myMongoDb) {
    mongoose.connect(mongoDB, {useNewUrlParser: true})

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB Atlas!');
    })
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../dist')));

app.listen(PORT, () => {
    console.log(`Success: Listening on ${PORT}`);
})
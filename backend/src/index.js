const express = require('express');
const app = new express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const notesRouter = require('./routers/notes');
app.use('/notes', notesRouter)

app.listen(4000, () => console.log('Listening to port 4000'));
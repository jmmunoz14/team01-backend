require('./config/config');
require('./models/db');

//import router
var partidasRouter = require('./routes/partidas');
var chatsRouter = require('./routes/chats');
var blogsRouter = require('./routes/blogs');


const path = require('path');
const morgan = require('morgan');
var mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const rtsUser = require('./routes/user');
const rtsQuestion = require('./routes/preguntas');
const rtsAnswer = require('./routes/respuestas');
const juegoRoutes = require("./routes/juegos");
const materiaRoutes = require("./routes/materias");
const habilidadRoutes = require("./routes/habilidades");



var app = express();
 
// middleware
app.set('jwt',jwt);

app.use(bodyParser.json());
app.use(cors());
app.use('/api', rtsUser);
app.use('/api', rtsQuestion);
app.use('/api', rtsAnswer);

app.use("/materias", materiaRoutes);
app.use("/juegos", juegoRoutes);
app.use("/habilidades", habilidadRoutes);

// start server

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

//settings
app.use(express.json());
app.set('views',path.join(__dirname,'views'));

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

//router
app.use('/partidas', partidasRouter);
app.use('/chats', chatsRouter);
app.use('/blogs', blogsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});


const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./config/db');
const serveIndex = require('serve-index');

// Configuracion de libreria dotenv
require('dotenv').config();

// mean_user
//  ZFTAA44EXJNL1ZBe

// inicio de nuestra aplicacion de express
const app = express();

// implementacion de cors
app.use(cors());

// parseo del body
app.use(express.json());

// mongo connection
dbConnection();

app.use(express.static(__dirname + '/'));
app.use('/uploads', serveIndex(__dirname + '/uploads'));

// configuracion de rutas
app.use('/api/users', require('./src/routes/users'));
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/hospitals', require('./src/routes/hospitals'));
app.use('/api/doctors', require('./src/routes/doctors'));
app.use('/api/all', require('./src/routes/all'));

app.listen(process.env.PORT, () => {
	console.log('Servidor corriendo en el puerto: ' + process.env.PORT);
});

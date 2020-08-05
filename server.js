const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./config/db');

// Configuracion de libreria dotenv
require('dotenv').config();

// mean_user
//  ZFTAA44EXJNL1ZBe

// inicio de nuestra aplicacion de express
const app = express();

// implementacion de cors
app.use(cors());

// mongo connection
dbConnection();

app.get('/', (req, res) => {
	res.json({ mensaje: 'entro' });
});

app.listen(process.env.PORT, () => {
	console.log('Servidor corriendo en el puerto: ' + process.env.PORT);
});

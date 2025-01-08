
const cors = require("cors");
const express = require("express");
const app = express();
require('dotenv').config()


import pg from 'pg'

const { Pool } = pg

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  allowExitOnIdle: true
}

const pool = new Pool(config);

app.use(cors()); 

app.use(express.json());

const usersRoutes = require("../routes/usuariosroutes");
const { reportarConsulta } = require("../middleware/authmiddleware");
app.use(usersRoutes);

app.use(express.json());
app.use(usersRoutes);
app.use(reportarConsulta);


app.listen(3000, () => console.log("SERVIDOR ENCENDIDO en el puerto 3000"));


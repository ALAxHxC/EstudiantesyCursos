

import env from 'dotenv';
env.config();
import express = require('express');
import mongoose from "mongoose";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/user";
import { FileRoutes } from "./routes/files";
import { ClientRoutes } from "./routes/client";
import { SecurityRoutes } from './routes/security';
const app: express.Application = express();
const busboy: any = require('connect-busboy');
const busboyBodyParser: any = require('busboy-body-parser');
mongoose.Promise = global.Promise;
mongoose.connect(String(process.env.MONGO)).then(
  () => { console.log("MongoDB Success") },
  err => { console.error.bind(console, "MongoDB Connection error") });

//Forms and JSON
app.use(busboy());
app.use(bodyParser.json());
app.use(busboyBodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
const security = new SecurityRoutes()
security.routes(app)
const routePrv = new Routes();
routePrv.routes(app)
const routesFiles = new FileRoutes();
routesFiles.routes(app);
const routesClient = new ClientRoutes();
routesClient.routes(app);



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
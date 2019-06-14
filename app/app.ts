import express = require('express');
import mongoose from "mongoose";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/crm";
// Create a new express application instance
const app: express.Application = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://daniel:Jenizaro_123@cluster0-shard-00-00-4upxq.mongodb.net:27017,cluster0-shard-00-01-4upxq.mongodb.net:27017,cluster0-shard-00-02-4upxq.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority').then(
  () => { console.log("MongoDB Success") },
  err => { console.error.bind(console, "MongoDB Connection error") });

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
const routePrv = new Routes();
routePrv.routes(app)



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
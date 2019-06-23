

import env from 'dotenv';
env.config();
import express = require('express');
import mongoose from "mongoose";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/user";
import { FileRoutes } from "./routes/files";
import { ClientRoutes } from "./routes/client"
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

require('./controllers/security/auth');
const routePrv = new Routes();
routePrv.routes(app)
const routesFiles = new FileRoutes();
routesFiles.routes(app);
const routesClient = new ClientRoutes();
routesClient.routes(app);


const OAuth2Server = require('oauth2-server'),
  Request = OAuth2Server.Request,
  Response = OAuth2Server.Response;


app.oauth = new OAuth2Server({
  model: require('./controllers/security/auth2'),
  accessTokenLifetime: 60 * 60,
  allowBearerTokensInQueryString: true,

});


function obtainToken(req, res) {

  var request = new Request(req);
  var response = new Response(res);

  return app.oauth.token(request, response)
    .then(function (token) {

      res.json(token);
    }).catch(function (err) {

      res.status(err.code || 500).json(err);
    });
}

function authenticateRequest(req, res, next) {

  var request = new Request(req);
  var response = new Response(res);
  console.log(req.body)
  return app.oauth.authenticate(request, response)
    .then(function (token) {

      next();
    }).catch(function (err) {

      res.status(err.code || 500).json(err);
    });
}


app.get('/test', authenticateRequest, function (req, res) {

  res.send('Congratulations, you are in a secret area!');
});
app.all('/oauth/token', obtainToken);



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express = require("express");
var mongoose_1 = __importDefault(require("mongoose"));
var bodyParser = __importStar(require("body-parser"));
var user_1 = require("./routes/user");
var files_1 = require("./routes/files");
var client_1 = require("./routes/client");
var security_1 = require("./routes/security");
var app = express();
var busboy = require('connect-busboy');
var busboyBodyParser = require('busboy-body-parser');
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.connect(String(process.env.MONGO)).then(function () { console.log("MongoDB Success"); }, function (err) { console.error.bind(console, "MongoDB Connection error"); });
//Forms and JSON
app.use(busboy());
app.use(bodyParser.json());
app.use(busboyBodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
var security = new security_1.SecurityRoutes();
security.routes(app);
var auth = security.authenticateRequest(app);
var routePrv = new user_1.Routes();
routePrv.routes(app, auth);
var routesFiles = new files_1.FileRoutes();
routesFiles.routes(app, auth);
var routesClient = new client_1.ClientRoutes();
routesClient.routes(app, auth);
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

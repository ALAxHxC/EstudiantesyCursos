"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var files_1 = require("../controllers/files");
var FileRoutes = /** @class */ (function () {
    function FileRoutes() {
    }
    FileRoutes.prototype.routes = function (app, auth) {
        app.route('/file')
            .post(auth, function (req, res) {
            files_1.uploadFile(req, res);
        })
            .get(auth, function (req, res) {
            files_1.getFiles(res);
        });
        app.route('/file/:id').get(auth, function (req, res) {
            files_1.downloadFileRoute(req.params.id, res);
        }).patch(auth, function (req, res) {
            files_1.updateFile(req, res);
        }).delete(auth, function (req, res) {
            files_1.deleteFile(req.params.id, res);
        });
    };
    return FileRoutes;
}());
exports.FileRoutes = FileRoutes;

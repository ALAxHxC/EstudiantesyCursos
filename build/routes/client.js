"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("../controllers/client");
var contactController = new client_1.ClientController();
var ClientRoutes = /** @class */ (function () {
    function ClientRoutes() {
    }
    ClientRoutes.prototype.routes = function (app, auth) {
        app.route('/client')
            .get(auth, function (req, res) {
            contactController.getAllContacts(req, res);
        })
            .post(auth, function (req, res) {
            contactController.addNewContact(req, res);
        });
        app.route(auth, '/client/:contactId')
            .get(function (req, res) {
            contactController.getByIdContact(req, res);
        })
            .put(auth, function (req, res) {
            contactController.updateDocument(req, res);
        })
            .delete(auth, function (req, res) {
            contactController.deleteDocument(req, res);
        });
    };
    return ClientRoutes;
}());
exports.ClientRoutes = ClientRoutes;

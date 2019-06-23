"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../controllers/user");
var usersController = new user_1.UserController();
var Routes = /** @class */ (function () {
    function Routes() {
    }
    Routes.prototype.routes = function (app, auth) {
        app.route('/user')
            .get(auth, function (req, res) {
            usersController.getAllContacts(req, res);
        })
            .post(function (req, res) {
            usersController.addNewContact(req, res);
        });
        app.route('/user/recover/:email').get(function (req, res) {
            usersController.recoverPassword(req.params.email, res);
        });
        app.route(auth, '/user/:contactId')
            .get(function (req, res) {
            usersController.getByIdContact(req, res);
        })
            .put(auth, function (req, res) {
            usersController.updateDocument(req, res);
        })
            .delete(auth, function (req, res) {
            usersController.deleteDocument(req, res);
        });
    };
    return Routes;
}());
exports.Routes = Routes;

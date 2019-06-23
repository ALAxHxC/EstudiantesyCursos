"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OAuth2Server = require('oauth2-server'), Request = OAuth2Server.Request, Response = OAuth2Server.Response;
var SecurityRoutes = /** @class */ (function () {
    function SecurityRoutes() {
        this.app = null;
    }
    SecurityRoutes.prototype.routes = function (app) {
        app.oauth = new OAuth2Server({
            model: require('../controllers/security/auth2'),
            accessTokenLifetime: 60 * 60,
            allowBearerTokensInQueryString: true,
        });
        this.app = app;
        app.get('/test', this.authenticateRequest(app), function (req, res) {
            res.send('Congratulations, you are in a secret area!');
        });
        app.all('/oauth/token', this.obtainToken(app));
    };
    SecurityRoutes.prototype.authenticateRequest = function (app) {
        return function (req, res, next) {
            var request = new Request(req);
            var response = new Response(res);
            return app.oauth.authenticate(request, response)
                .then(function (token) {
                next();
            }).catch(function (err) {
                res.status(err.code || 500).json(err);
            });
        };
    };
    SecurityRoutes.prototype.obtainToken = function (app) {
        return function (req, res) {
            var request = new Request(req);
            var response = new Response(res);
            return app.oauth.token(request, response)
                .then(function (token) {
                res.json(token);
            }).catch(function (err) {
                res.status(err.code || 500).json(err);
            });
        };
    };
    return SecurityRoutes;
}());
exports.SecurityRoutes = SecurityRoutes;

import { Request, Response } from "express";
const OAuth2Server = require('oauth2-server'),
  Request = OAuth2Server.Request,
  Response = OAuth2Server.Response;

export class SecurityRoutes {
  app: any;
  constructor() {
    this.app = null;
  }
  public routes(app: any): void {
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

  }

  public authenticateRequest(app: any) {
    return (req, res, next) => {

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
  }

  public obtainToken(app: any) {
    return (req, res) => {

      var request = new Request(req);
      var response = new Response(res);

      return app.oauth.token(request, response)
        .then(function (token) {

          res.json(token);
        }).catch(function (err) {

          res.status(err.code || 500).json(err);
        });
    }
  }





}


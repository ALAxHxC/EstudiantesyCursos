const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
import { Client } from '../../models/client';
import { Token } from '../../models/token';
import { User } from '../../models/user';

passport.use(new BasicStrategy(
  function (username: string, password: string, done: Function) {
    Client.findOne({ clientId: username }, function (err: any, client: any) {
      if (err) { return done(err); }
      if (!client) { return done(null, false); }
      if (client.clientSecret != password) { return done(null, false); }

      return done(null, client);
    });
  }
));
passport.use(new ClientPasswordStrategy(
  function (clientId: string, clientSecret: string, done: Function) {
    Client.findOne({ clientId: clientId }, function (err: any, client: any) {
      if (err) { return done(err); }
      if (!client) { return done(null, false); }
      if (client.clientSecret != clientSecret) { return done(null, false); }

      return done(null, client);
    });
  }
));

passport.use(new
  BearerStrategy(
    function (accessToken: string, done: Function) {
      Token.findOne({ token: accessToken }, function (err: any, token: any) {
        if (err) { return done(err); }
        if (!token) { return done(null, false); }

        if (Math.round((Date.now() - token.created) / 1000) > config.get('security:tokenLife')) {
          Token.remove({ token: accessToken }, function (err: any) {
            if (err) return done(err);
          });
          return done(null, false, { message: 'Token expired' });
        }

        User.findById(token.userId, function (err: any, user: any) {
          if (err) { return done(err); }
          if (!user) { return done(null, false, { message: 'Unknown user' }); }

          var info = { scope: '*' }
          done(null, user, info);
        });
      });
    }
  ));
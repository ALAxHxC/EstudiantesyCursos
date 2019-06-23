/**
 * Configuration.
 */
import { Client } from '../../models/client';
import { Token } from '../../models/token';
import { User } from '../../models/user';

var config = {
  tokens: []
};


/*
 * Methods used by all grant types.
 */

var getAccessToken = function (token) {

  return Token.findOne({
    accessToken: token
  });
};

var getClient = function (clientId, clientSecret) {
  return Client.findOne({
    clientId: clientId,
    clientSecret: clientSecret
  })
};

var saveToken = function (token, client, user) {

  token.client = {
    id: client.clientId
  };

  token.user = {
    id: user.username || user.clientId
  };

  var tokenInstance = new Token(token);

  tokenInstance.save();

  return token;
};

/*
 * Method used only by password grant type.
 */

var getUser = function (username: string, password: string) {
  console.log(username, password)

  return User.findOne({
    username: username,
    //: password
  });
};

/*
 * Method used only by client_credentials grant type.
 */

var getUserFromClient = function (client) {

  return clientModel.findOne({
    clientId: client.clientId,
    clientSecret: client.clientSecret,
    grants: 'client_credentials'
  });
};

/*
 * Methods used only by refresh_token grant type.
 */

var getRefreshToken = function (refreshToken) {

  var tokens = config.tokens.filter(function (savedToken) {

    return savedToken.refreshToken === refreshToken;
  });

  if (!tokens.length) {
    return;
  }

  var token = Object.assign({}, tokens[0]);
  token.user.username = token.user.id;

  return token;
};

var revokeToken = function (token) {

  config.tokens = config.tokens.filter(function (savedToken) {

    return savedToken.refreshToken !== token.refreshToken;
  });

  var revokedTokensFound = config.tokens.filter(function (savedToken) {

    return savedToken.refreshToken === token.refreshToken;
  });

  return !revokedTokensFound.length;
};

/**
 * Export model definition object.
 */

module.exports = {
  getAccessToken: getAccessToken,
  getClient: getClient,
  saveToken: saveToken,
  getUser: getUser,
  getUserFromClient: getUserFromClient,
  getRefreshToken: getRefreshToken,
  //revokeToken: revokeToken
};

/**
 * Configuration.
 */
import { Client } from '../../models/client';
import { Token } from '../../models/token';
import { User } from '../../models/user';
import { Entity } from '../../models/entity';
/*
 * Methods used by all grant types.
 */

var getAccessToken = function (token: string) {

  return Token.findOne({
    accessToken: token
  });
};

var getClient = function (clientId: string, clientSecret: string) {
  return Client.findOne({
    clientId: clientId,
    clientSecret: clientSecret
  })
};

var saveToken = function (token: any, client: any, user: any) {

  token.client = {
    id: client.clientId
  };

  token.user = {
    id: user.username || user.clientId
  };

  let entity = new Entity(Token)
  entity.cleanCreate({
    'client.id': client.clientId,
    'user.id': user.username || user.clientId
  }, token)
  return token;
};

/*
 * Method used only by password grant type.
 */

var getUser = function (username: string, password: string) {
  console.log(username, password)

  return User.findOne({
    username: username,
    password: password
  });
};

/*
 * Method used only by client_credentials grant type.
 */

var getUserFromClient = function (client: any) {

  return Client.findOne({
    clientId: client.clientId,
    clientSecret: client.clientSecret,
    grants: 'client_credentials'
  });
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
};

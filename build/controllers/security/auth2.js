"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Configuration.
 */
var client_1 = require("../../models/client");
var token_1 = require("../../models/token");
var user_1 = require("../../models/user");
var entity_1 = require("../../models/entity");
/*
 * Methods used by all grant types.
 */
var getAccessToken = function (token) {
    return token_1.Token.findOne({
        accessToken: token
    });
};
var getClient = function (clientId, clientSecret) {
    return client_1.Client.findOne({
        clientId: clientId,
        clientSecret: clientSecret
    });
};
var saveToken = function (token, client, user) {
    token.client = {
        id: client.clientId
    };
    token.user = {
        id: user.username || user.clientId
    };
    var entity = new entity_1.Entity(token_1.Token);
    entity.cleanCreate({
        'client.id': client.clientId,
        'user.id': user.username || user.clientId
    }, token);
    return token;
};
/*
 * Method used only by password grant type.
 */
var getUser = function (username, password) {
    console.log(username, password);
    return user_1.User.findOne({
        username: username,
        password: password
    });
};
/*
 * Method used only by client_credentials grant type.
 */
var getUserFromClient = function (client) {
    return client_1.Client.findOne({
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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var cryptLib = require('cryptlib');
var ps = process.env.SECRET || String("e4b749e81288302501f897996a364797");
var iv = process.env.IVI || "ed82a7c7b7a202dc";
var UserChema = new Schema({
    username: { type: String, require: true, index: true, unique: true, sparse: true },
    password: { type: String }
}, { timestamps: true });
UserChema.pre('save', function (next) {
    var person = this;
    person.password = cryptLib.encrypt(person.password, ps, iv);
    next();
});
UserChema.pre('update', function (next) {
    var update = this.getUpdate();
    if (!update.password) {
        return next();
    }
    this.getUpdate().password = cryptLib.encrypt(update.password, ps, iv);
});
UserChema.pre('updateOne', function (next) {
    var update = this.getUpdate();
    if (!update.password) {
        return next();
    }
    this.getUpdate().password = cryptLib.encrypt(update.password, ps, iv);
    next();
});
UserChema.pre('findOne', function (next) {
    //console.log(this);
    var query = this;
    var queryOption = this.getQuery();
    if (queryOption.password == null)
        next();
    queryOption.password = cryptLib.encrypt(queryOption.password, ps, iv);
    query.setQuery(queryOption);
    next();
});
exports.User = mongoose_1.default.model('User', UserChema);

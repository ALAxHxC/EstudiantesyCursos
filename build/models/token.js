"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var Model = new Schema({
    user: Schema.Types.Mixed,
    client: Schema.Types.Mixed,
    accessTokenExpiresAt: { type: Date },
    refreshTokenExpiresAt: { type: Date },
    refreshToken: { type: String },
    accessToken: { type: String, unique: true }
}, { timestamps: true });
Model.pre('save', function (next) {
    var data = this;
    exports.Token.remove({
        accessToken: data.accessToken
    }).then(function (data) {
        next();
    }).catch(function (error) {
        next();
    });
});
exports.Token = mongoose_1.default.model('token', Model);

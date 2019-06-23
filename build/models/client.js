"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var Model = new Schema({
    name: { type: String },
    clientId: { type: String, required: 'ClientIdInvalidad' },
    clientSecret: { type: String, required: 'SecretInvalid' },
    grants: [String],
    redirectUris: [String]
}, { timestamps: true });
exports.Client = mongoose_1.default.model('Client', Model);

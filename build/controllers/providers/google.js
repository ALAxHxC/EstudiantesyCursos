"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var storage = __importStar(require("@google-cloud/storage"));
var path = require('path');
var credentials = path.join(__dirname, '..', '..', 'certs', process.env.CERT);
console.log(credentials);
//Firebase personal project
var storageGCP = new storage.Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: credentials
});
var bucket = storageGCP.bucket(String(process.env.GCS_BUCKET));
exports.getAllFiles = function () { return __awaiter(_this, void 0, void 0, function () {
    var files;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bucket.getFiles()];
            case 1:
                files = (_a.sent())[0];
                files = files.map(function (item) {
                    return { id: item.name, url: exports.createPublicFileURL(item) };
                });
                return [2 /*return*/, files];
        }
    });
}); };
exports.getOneFile = function (name) { return __awaiter(_this, void 0, void 0, function () {
    var file;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bucket.file(name)];
            case 1:
                file = _a.sent();
                file.url = exports.createPublicFileURL(file);
                return [2 /*return*/, file];
        }
    });
}); };
exports.changeName = function (id, new_name) { return __awaiter(_this, void 0, void 0, function () {
    var file, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, bucket.file(id).move(new_name)];
            case 1:
                _a.sent();
                return [4 /*yield*/, bucket.file(new_name)];
            case 2:
                file = _a.sent();
                return [2 /*return*/, { id: file.name, url: exports.createPublicFileURL(file) }];
            case 3:
                error_1 = _a.sent();
                throw (error_1);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.donwloadFile = function (id) { return __awaiter(_this, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, bucket.file(id).download({ destination: "temp/" + id })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                throw (error_2);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteName = function (id) { return __awaiter(_this, void 0, void 0, function () {
    var data, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, bucket.file(id).delete()];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data];
            case 2:
                error_3 = _a.sent();
                throw error_3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.uploadFirebaseFile = function (file, mime) { return __awaiter(_this, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = new Promise(function (resolve, reject) {
                    bucket.upload("temp/" + file, {
                        destination: file,
                        public: true,
                        metadata: { contentType: mime, cacheControl: "public, max-age=300" }
                    }, function (err, result_file) {
                        if (err) {
                            console.log(err);
                            reject(err);
                            return;
                        }
                        //console.log(result_file)
                        result_file.makePublic().then(function (data) {
                            resolve({ "url": exports.createPublicFileURL(result_file), "id": result_file.id });
                        }).catch(function (error) {
                            reject(error);
                        });
                    });
                });
                return [4 /*yield*/, data];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.createPublicFileURL = function (new_file) {
    var img_url = 'https://firebasestorage.googleapis.com/v0/b/' + process.env.GCS_BUCKET + '/o/'
        + encodeURIComponent(new_file.name)
        + '?alt=media&token='
        + new_file.metadata.firebaseStorageDownloadTokens;
    return img_url;
};

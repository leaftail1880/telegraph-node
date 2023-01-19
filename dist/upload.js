"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var promises_1 = require("fs/promises");
var node_fetch_1 = require("node-fetch");
/**
 * Helps to upload local files upto 5 or 6MB (I think) to Telegraph's file
 * uploading service and returns the URL of the uploaded file.
 *
 * Useful to add local images as a source for `<img>`.
 *
 * Supported file formats: `.jpg`, `.jpeg`, `.png`, `.gif` and `.mp4`.
 *
 * ```ts
 * const imgUrl = await Telegraph.upload("./assets/images/banner.png");
 * ```
 *
 * **This is not actually a part of the official Telegraph API**, at least, it
 * does not have any official documentation.
 *
 * @param src The local or remote file path or URL.
 * @returns Remote URL to the uploaded file.
 */
function upload(
// Deleted URL suppoty
src) {
    return __awaiter(this, void 0, void 0, function () {
        var blob, r, response, buffer, file, form, res, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(typeof src === "string")) return [3 /*break*/, 7];
                    r = new RegExp("http(s?)://telegra.ph/file/(.+).(.+)", "i");
                    if (r.test(src))
                        return [2 /*return*/, src.toLowerCase()];
                    if (!(src.startsWith("https://") || src.startsWith("http://"))) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, node_fetch_1.default)(src)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.arrayBuffer()];
                case 2:
                    buffer = _a.sent();
                    blob = new Uint8Array(buffer);
                    return [3 /*break*/, 6];
                case 3: 
                // Probably (It should be) it's a file path.
                return [4 /*yield*/, promises_1.default.access(src).catch(function () {
                        throw new Error("The file '".concat(src, "' does not exists"));
                    })];
                case 4:
                    // Probably (It should be) it's a file path.
                    _a.sent();
                    return [4 /*yield*/, promises_1.default.readFile(src)];
                case 5:
                    blob = _a.sent();
                    _a.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    // Blob | Uint8Array | BufferSource?
                    blob = src;
                    _a.label = 8;
                case 8:
                    file = new node_fetch_1.File([blob], "blob");
                    form = new node_fetch_1.FormData();
                    form.append("photo", file);
                    return [4 /*yield*/, (0, node_fetch_1.default)("https://telegra.ph/upload", {
                            method: "POST",
                            body: form,
                        })];
                case 9:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 10:
                    json = (_a.sent());
                    if (json.error)
                        throw new Error(json.error);
                    return [2 /*return*/, "https://telegra.ph".concat(json[0].src)];
            }
        });
    });
}
exports.upload = upload;

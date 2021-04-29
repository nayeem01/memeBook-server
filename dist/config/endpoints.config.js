"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const path_1 = require("path");
dotenv.config({ path: path_1.resolve(__dirname, './config.env') });
exports.default = {
    URL: (_a = process.env.URL) !== null && _a !== void 0 ? _a : '',
    PORT: (_b = process.env.PORT) !== null && _b !== void 0 ? _b : '',
    REDIS_PORT: (_c = process.env.REDIS_PORT) !== null && _c !== void 0 ? _c : '',
    JWT_KEY: (_d = process.env.JWT_SECRET) !== null && _d !== void 0 ? _d : '',
    JWT_EXPIRE: (_e = process.env.JWT_EXPIRE) !== null && _e !== void 0 ? _e : '',
    JWT_COOKIE_EXPIRE: (_f = process.env.JWT_COOKIE_EXPIRE) !== null && _f !== void 0 ? _f : '',
};

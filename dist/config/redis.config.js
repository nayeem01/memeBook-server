"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const redis_1 = __importDefault(require("redis"));
const endpoints_config_1 = __importDefault(require("./endpoints.config"));
const REDIS_PORT = endpoints_config_1.default.REDIS_PORT || 6379;
exports.client = redis_1.default.createClient(REDIS_PORT);

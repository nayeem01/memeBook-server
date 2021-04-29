"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const endpoints_config_1 = __importDefault(require("./endpoints.config"));
const connectDB = async () => {
    const conn = await mongoose_1.default.connect(endpoints_config_1.default.URL, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(`MongoDB connected : ${conn.connection.host}`);
};
exports.default = connectDB;

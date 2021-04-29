"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protection = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const endpoints_config_1 = __importDefault(require("../config/endpoints.config"));
// Protect routes
const protection = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        if (!token) {
            console.log(token);
            res.status(401).json({
                success: false,
                message: 'Not authorized to access this route',
            });
        }
        else {
            try {
                const decoder = jsonwebtoken_1.default.verify(token, endpoints_config_1.default.JWT_KEY);
                const temp = await User_1.default.findById(decoder.id);
                if (temp !== null)
                    req.user = temp;
                next();
            }
            catch (err) {
                return next(err);
            }
        }
    }
    else {
        res.status(401).json({
            success: false,
            message: 'Not authorized to access this route',
        });
    }
};
exports.protection = protection;

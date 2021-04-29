"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const endpoints_config_1 = __importDefault(require("../config/endpoints.config"));
const register = async (req, res, next) => {
    const { name, password } = req.body;
    const user = await User_1.default.create({
        name,
        password,
    });
    user.save({ validateBeforeSave: false });
    sendTokenResponse(user, 200, res);
};
exports.register = register;
const login = async (req, res, next) => {
    const { name, password } = req.body;
    if (!name || !password) {
        res.status(400).json({
            success: false,
            message: 'Please provide username and password',
        });
    }
    else {
        const user = await User_1.default.findOne({ name }).select('+password');
        if (!user) {
            res.status(400).json({
                success: false,
                message: 'user not found',
            });
        }
        else {
            const isMatch = await user.matchPassword(password);
            if (!isMatch) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid credentials',
                });
            }
            else {
                sendTokenResponse(user, 200, res);
            }
        }
    }
};
exports.login = login;
const logout = async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        data: {},
    });
};
exports.logout = logout;
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const options = {
        expires: new Date(Date.now() + endpoints_config_1.default.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
    });
};

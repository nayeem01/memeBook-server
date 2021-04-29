"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const endpoints_config_1 = __importDefault(require("../config/endpoints.config"));
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Please add a name'],
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 4,
        select: false,
    },
    picture: {
        type: String,
    },
    resetPasswordToken: String,
    restPasswordExpire: Date,
}, { timestamps: true });
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    this.password = await bcryptjs_1.default.hash(this.password, salt);
});
UserSchema.methods.getSignedJwtToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, endpoints_config_1.default.JWT_KEY, {
        expiresIn: endpoints_config_1.default.JWT_EXPIRE,
    });
};
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs_1.default.compare(enteredPassword, this.password);
};
exports.default = mongoose_1.model('User', UserSchema);

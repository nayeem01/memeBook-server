"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
const redis_config_1 = require("../config/redis.config");
const cache = async (req, res, next) => {
    const post = 'post';
    redis_config_1.client.get(post, (err, data) => {
        if (err)
            throw err;
        if (data !== null) {
            res.status(200).json({
                success: true,
                meta_data: 'from cache',
                data: JSON.parse(data),
            });
        }
        else {
            next();
        }
    });
};
exports.cache = cache;

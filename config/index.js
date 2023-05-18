"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOUDINARY_SECRET = exports.CLOUDINARY_KEY = exports.CLOUDINARY_NAME = exports.EMAIL_PASSWORD = exports.EMAIL_USER = exports.SECRET = exports.MONGO_URI = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
if (process.env.NODE_ENV !== 'production') {
    (0, dotenv_1.config)();
}
exports.PORT = process.env.PORT;
exports.MONGO_URI = process.env.MONGO_URI;
exports.SECRET = process.env.SECRET;
exports.EMAIL_USER = process.env.EMAIL_USER;
exports.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
exports.CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
exports.CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
exports.CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;

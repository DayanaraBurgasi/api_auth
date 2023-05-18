"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioModel = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuarioSchema = new mongoose_1.Schema({
    nombres: String,
    apellidos: String,
    cedula: String,
    rol: {
        type: String,
        default: 'user'
    },
    email: String,
    password: String,
    claveTemporal: {
        type: String,
        default: null
    },
    pin: {
        type: String,
        default: null
    },
    fotoURL: String,
    fechaCreacion: {
        type: Date,
        default: Date.now()
    },
    fechaModificacion: {
        type: Date,
        default: Date.now()
    }
});
usuarioSchema.methods.compararPasswords = function (password) {
    return bcrypt_1.default.compare(password, this.password);
};
usuarioSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    delete obj.pin;
    delete obj.claveTemporal;
    delete obj.__v;
    return obj;
};
exports.UsuarioModel = (0, mongoose_1.model)('usuarios', usuarioSchema);

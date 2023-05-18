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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const error_1 = require("../error");
const verificarToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers['token'];
        if (!token) {
            const error = new Error('No ha enviado el token');
            error.status = 401;
            return (0, error_1.manejarError)(res, error);
        }
        const decodificado = jsonwebtoken_1.default.verify(token, config_1.SECRET);
        req.query.usuarioId = decodificado.id;
        next();
    }
    catch (error) {
        return (0, error_1.manejarError)(res, new Error('Token inválido o expirado!'));
    }
});
exports.verificarToken = verificarToken;

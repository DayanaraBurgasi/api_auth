"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const joiMensajes_1 = require("./joiMensajes");
exports.UsuarioValidation = {
    validacionRegistro: joi_1.default.object({
        nombres: joi_1.default.string()
            .custom((value, helpers) => {
            if (!new RegExp(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/).test(value)) {
                return helpers.error('string.custom.nombreCompleto');
            }
            return value;
        })
            .required(),
        apellidos: joi_1.default.string()
            .custom((value, helpers) => {
            if (!new RegExp(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/).test(value)) {
                return helpers.error('string.custom.nombreCompleto');
            }
            return value;
        })
            .required(),
        cedula: joi_1.default.string()
            .custom((value, helpers) => {
            if (!new RegExp(/^\d{10}$/).test(value)) {
                return helpers.error('string.custom.validarCedula');
            }
            return value;
        })
            .required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(8).required(),
        fotoBase64: joi_1.default.string()
            .custom((value, helpers) => {
            if (!new RegExp(/^data:([a-z]+\/[a-z]+);base64,([a-zA-Z0-9+/]+={0,2})$/).test(value)) {
                return helpers.error('string.custom.validarBase64');
            }
            return value;
        }).required(),
    })
        .messages(joiMensajes_1.mensajesDeError)
};

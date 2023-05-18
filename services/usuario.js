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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const models_1 = require("../models");
const utils_1 = require("../utils");
const enviarEmail_1 = require("../utils/enviarEmail");
const validations_1 = require("../validations");
exports.UsuarioService = {
    /**
     * Funcion para crear un usuario realiza las siguientes acciones:
     * - Validar información
     * - Registrar un usuario
     * - Envia por email un pin temporal para poder realizar operaciones en el cajero
     *
     * @param entidad
     */
    registrar: (entidad) => __awaiter(void 0, void 0, void 0, function* () {
        const { error } = validations_1.UsuarioValidation.validacionRegistro.validate(entidad);
        if (error) {
            throw new Error(error.message);
        }
        const existeUsuario = yield models_1.UsuarioModel.find({ $or: [
                {
                    email: entidad.email.trim().toLowerCase(),
                },
                {
                    cedula: entidad.cedula.trim()
                }
            ] });
        if (existeUsuario.length > 0) {
            if (existeUsuario[0].email === entidad.email.trim().toLowerCase()) {
                throw new Error('El email ya está registrado!');
            }
            else {
                throw new Error('La cédula ya está registrada!');
            }
        }
        let pin = (Math.floor(Math.random() * 900000) + 100000).toString();
        yield (0, enviarEmail_1.enviarEmail)(entidad.email, `Pin: ${pin}`, "Banca Web PIN TEMPORAL");
        entidad.password = yield (0, utils_1.encriptarCadena)(entidad.password);
        pin = yield (0, utils_1.encriptarCadena)(pin);
        const fotoURL = yield (0, utils_1.subirImagen)(entidad.fotoBase64);
        const nuevoUsuario = yield models_1.UsuarioModel.create({
            nombres: entidad.nombres.trim().toLowerCase(),
            apellidos: entidad.apellidos.trim().toLowerCase(),
            cedula: entidad.cedula.trim(),
            email: entidad.email.trim().toLowerCase(),
            password: entidad.password,
            pin,
            fotoURL
        });
        return nuevoUsuario;
    }),
    login(entidad) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield models_1.UsuarioModel.findOne({
                email: entidad.email
            });
            if (!usuario || !(yield usuario.compararPasswords(entidad.password))) {
                throw new Error('Credenciales incorrectas!');
            }
            const token = (0, utils_1.generarToken)(usuario._id);
            return { usuario, token };
        });
    },
    buscarPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield models_1.UsuarioModel.findById(id);
            if (!usuario) {
                throw new Error('El usuario no existe!');
            }
            return usuario;
        });
    },
    recuperarPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield models_1.UsuarioModel.findOne({
                email: email.toLowerCase()
            });
            if (!usuario) {
                throw new Error('El usuario no existe!');
            }
            let pin = (Math.floor(Math.random() * 900000) + 100000).toString();
            yield (0, enviarEmail_1.enviarEmail)(usuario.email, `Pin: ${pin}`, "Banca Web PIN TEMPORAL");
            pin = yield (0, utils_1.encriptarCadena)(pin);
            usuario.pin = pin;
            yield usuario.save();
            return usuario;
        });
    },
    cambiarPassword(cedula, pin, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield models_1.UsuarioModel.findOne({
                cedula: cedula.trim()
            });
            if (!usuario) {
                throw new Error('El usuario no existe!');
            }
            usuario.password = yield (0, utils_1.encriptarCadena)(password);
            yield usuario.save();
            return usuario;
        });
    },
};

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
exports.UsuarioController = void 0;
const error_1 = require("../error");
const services_1 = require("../services");
exports.UsuarioController = {
    registrar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const usuarioNuevo = yield services_1.UsuarioService.registrar(req.body);
            return res.json(usuarioNuevo);
        }
        catch (error) {
            return (0, error_1.manejarError)(res, error);
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield services_1.UsuarioService.login(req.body);
            return res.json(data);
        }
        catch (error) {
            return (0, error_1.manejarError)(res, error);
        }
    }),
    buscarPorId: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield services_1.UsuarioService.buscarPorId(req.query.usuarioId);
            return res.json({ usuario: data, token: req.headers.token });
        }
        catch (error) {
            return (0, error_1.manejarError)(res, error);
        }
    }),
    recuperarPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield services_1.UsuarioService.recuperarPassword(req.body.email);
            return res.json(data);
        }
        catch (error) {
            return (0, error_1.manejarError)(res, error);
        }
    }),
    cambiarPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield services_1.UsuarioService.cambiarPassword(req.body.cedula, req.body.pin, req.body.password);
            return res.json(data);
        }
        catch (error) {
            return (0, error_1.manejarError)(res, error);
        }
    }),
};

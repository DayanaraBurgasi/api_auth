"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manejarError = void 0;
const manejarError = (res, error) => {
    var _a, _b;
    return res.status((_a = error.status) !== null && _a !== void 0 ? _a : 400)
        .json(Object.assign(Object.assign({}, error), { mensaje: (_b = error.message) !== null && _b !== void 0 ? _b : 'Error en el servidor' }));
};
exports.manejarError = manejarError;

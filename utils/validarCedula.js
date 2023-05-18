"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCedula = void 0;
const validarCedula = (cedula) => {
    const regex = /^[0-9]{10}$/;
    if (!regex.test(cedula)) {
        return false;
    }
    const factor = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const digitos = cedula.split('').map(Number);
    const noveno = digitos[8];
    const suma = digitos.reduce((acc, val, i) => {
        if (i === 9) {
            return acc;
        }
        const f = factor[i];
        const d = val * f;
        const s = d > 9 ? d - 9 : d;
        return acc + s;
    }, 0);
    const residuo = suma % 10;
    if ((residuo === 0 && noveno === 0) || (residuo === 1 && noveno === 1) || (residuo > 1 && noveno === 10 - residuo)) {
        return true;
    }
    return false;
};
exports.validarCedula = validarCedula;

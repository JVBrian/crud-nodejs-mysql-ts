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
exports.deleteUsuario = exports.putUsuario = exports.postUsuarios = exports.getUsuario = exports.getUsuarios = void 0;
const ususario_1 = require("../models/ususario");
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield ususario_1.Usuario.findAll();
    res.json(usuarios);
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield ususario_1.Usuario.findByPk(id);
    if (!usuario)
        return res.status(404).json({
            message: "Usuario no encontrado",
        });
    res.json(usuario);
});
exports.getUsuario = getUsuario;
const postUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, estado } = req.body;
    try {
        const existeEmail = yield ususario_1.Usuario.findOne({
            where: {
                email,
            },
        });
        if (existeEmail)
            return res.status(400).json({
                message: "El email ya está registrado",
            });
        const usuario = yield ususario_1.Usuario.create({
            nombre,
            email,
            estado,
        });
        yield (yield usuario).save();
        res.status(200).json({
            message: "Registro exitoso",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un problema",
        });
    }
});
exports.postUsuarios = postUsuarios;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield ususario_1.Usuario.findByPk(id);
        if (!usuario)
            return res.status(400).json({
                message: "Usuario no encontrado",
            });
        yield usuario.update(body);
        res.status(200).json({
            message: "Usuario se ha actualizado",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Ha ocurrido un error",
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield ususario_1.Usuario.findByPk(id);
    if (!usuario)
        return res.status(404).json({
            message: "Usuario no encontrado",
        });
    yield usuario.destroy();
    res.status(200).json({
        message: "Se ha eliminado el usuario",
    });
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.controllers.js.map
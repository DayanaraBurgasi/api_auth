"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const database_1 = require("./database");
const routes_1 = require("./routes");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        (0, database_1.conectarMongoDB)();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(express_1.default.json({ limit: '15mb' }));
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.get('/', (req, res) => {
            return res.json({
                api: 'API para la Authenticación'
            });
        });
        this.app.use('/api/usuario', routes_1.usuarioRouter);
    }
    levantar() {
        this.app.listen(config_1.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${config_1.PORT}`);
        });
    }
}
exports.Server = Server;

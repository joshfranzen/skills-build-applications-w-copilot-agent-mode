"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("./config/database.js");
const api_js_1 = __importDefault(require("./routes/api.js"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', api_js_1.default);
const errorHandler = (error, _request, response, _next) => {
    console.error(error);
    response.status(500).json({ message: 'Internal server error' });
};
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Octofit API listening on port ${port}`);
});

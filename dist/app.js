"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const book_controller_1 = require("./app/controllers/book.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors({
    origin: ['https://glittery-cheesecake-cf81ab.netlify.app'],
    credentials: true,
}));
app.use('/bookApi', book_controller_1.bookRoutes);
app.use('/borrowApi', borrow_controller_1.borrowBook);
app.get('/', (req, res) => {
    res.send('Welcome to library management system');
});
exports.default = app;

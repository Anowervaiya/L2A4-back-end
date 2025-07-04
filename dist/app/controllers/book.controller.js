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
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRoutes = express_1.default.Router();
exports.bookRoutes.post('/create-book', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const book = yield book_model_1.Book.create(body);
    res.status(201).json({
        success: true,
        message: 'Book added successfully',
        data: book,
    });
}));
exports.bookRoutes.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const filter = req.query.filter;
    // const sortBy = req.query.sortBy as string;
    // const sortOrder = req.query.sort === 'asc' ? 1 : -1;
    // const limit = parseInt(req.query.limit as string) || 10;
    const books = yield book_model_1.Book.find();
    // {
    //   genre: filter;
    // } inside find()
    // .sort({ [sortBy]: sortOrder })
    // .limit(limit);
    res.status(201).json({
        success: true,
        message: 'All book retreived successfuly',
        data: books,
    });
}));
exports.bookRoutes.get('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const books = yield book_model_1.Book.findById(bookId);
    res.status(201).json({
        success: true,
        message: 'single book retreived successfuly',
        data: books,
    });
}));
exports.bookRoutes.put('/edit-book/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.id;
    const updatedBook = req.body;
    const book = yield book_model_1.Book.findByIdAndUpdate(bookId, updatedBook, { new: true });
    res.status(201).json({
        success: true,
        message: 'book updated successfuly',
        data: book,
    });
}));
exports.bookRoutes.delete('/books/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield book_model_1.Book.findByIdAndDelete(bookId);
    res.status(201).json({
        success: true,
        message: 'Book Deleted successfuly',
        data: book,
    });
}));

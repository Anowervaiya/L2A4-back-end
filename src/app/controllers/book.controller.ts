import express, { Request, Response } from 'express';
import { Book } from '../models/book.model';
export const bookRoutes = express.Router();

 bookRoutes.post('/create-book', async (req: Request, res: Response) => {
  const body = req.body;


  const book = await Book.create(body);
  res.status(201).json({
    success: true,
    message: 'Book added successfully',
    data: book,
  });
});

bookRoutes.get('/books', async (req: Request, res: Response) => {
  // const filter = req.query.filter;
  // const sortBy = req.query.sortBy as string;
  // const sortOrder = req.query.sort === 'asc' ? 1 : -1;
  // const limit = parseInt(req.query.limit as string) || 10;

  const books = await Book.find();

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
});

bookRoutes.get('/books/:id', async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const books = await Book.findById(bookId);
  res.status(201).json({
    success: true,
    message: 'single book retreived successfuly',
    data: books,
  });
});

bookRoutes.put('/edit-book/:id', async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const updatedBook = req.body;
  const book = await Book.findByIdAndUpdate(bookId, updatedBook, { new: true });

  res.status(201).json({
    success: true,
    message: 'book updated successfuly',
    data: book,
  });
});

bookRoutes.delete('/books/:bookId', async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const book = await Book.findByIdAndDelete(bookId);

  res.status(201).json({
    success: true,
    message: 'Book Deleted successfuly',
    data: book,
  });
});

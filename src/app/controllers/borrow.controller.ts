import express, { Request, Response } from 'express';
import { Book } from '../models/book.model';
import { Borrow } from '../models/borrow.model';

export const borrowBook = express.Router();

borrowBook.post('/borrow', async (req: Request, res: Response) => {


  try {
    const { book: bookId, quantity, dueDate } = req.body;
    const data = req.body;
console.log(data);
   await Book.borrowCopies( bookId, quantity);

    const borrow = await Borrow.create({ book: bookId, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrow,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Borrow failed',
    });
  }
});


borrowBook.get('/borrow-summary', async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $lookup: {
          from: 'books', 
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails',
        },
      },
      {
        $unwind: '$bookDetails',
      },
      {
        $project: {
          _id: 0,
          book: {
            title: '$bookDetails.title',
            isbn: '$bookDetails.isbn',
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: summary,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch borrowed books summary',
    });
  }
});
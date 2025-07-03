import { model, Schema } from 'mongoose';
import { BookModel, IBook } from '../interfaces/book.interface';

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    require: true,
    trim: true,
  },
  author: {
    type: String,
    require: true,
    trim: true,
  },
  genre: {
    type: String,
    require: true,
    enum: [
      'FICTION',
      'NON_FICTION',
      'SCIENCE',
      'HISTORY',
      'BIOLOGY',
      'FANTASY',
    ],
  },

  isbn: {
    type: String,
    require: true,
    unique: true,
  },
  description: {
    type: String,
  },
  copies: {
    type: Number,
    require: true,
    min: 0,
  },

  available: {
    type: Boolean,
    default: true,
  },
},
  {
    _id: true,
    timestamps:true
});


bookSchema.statics.borrowCopies = async function (
  bookId: string,
  quantity: number
) {
  const book = await this.findById(bookId);
 
  if (!book) throw new Error('Book not found');

  if (book.copies < quantity) {
    throw new Error('Not enough copies available');
  }

  book.copies -= quantity;
  if (book.copies === 0) {
    book.available = false;
    throw new Error('Not enough copies available');
  }

  await book.save();
};

export const Book = model<IBook, BookModel>('Book', bookSchema);
import { Model } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  genre:
    | 'FICTION'
    | 'NON_FICTION'
    | 'SCIENCE'
    | 'HISTORY'
    | 'BIOLOGY'
    | 'FANTASY';

  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface BookModel extends Model<IBook> {
  borrowCopies(bookId: string, quantity: number): Promise<void>;
}

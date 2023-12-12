import { Book, mapToBook } from "../models/Book";
import { mockBooks } from "../mocks/Books";

export function getBooks(): Promise<Array<Book>> {
  return Promise.resolve(mockBooks.map((b) => mapToBook(b)));
}

export type DbBook = {
  department: string;
  portfolio: string;
};

export type Book = {
  department: string;
  portfolio: string;
};

export function mapToBook(book: DbBook): Book {
  const { department, portfolio } = book;

  return {
    department,
    portfolio,
  };
}

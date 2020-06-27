import React from 'react';
import Book from './Book';

const BooksList = props => {
  const { books, handleChangeShelf } = props;
  return (
    <ol className="books-grid">
      {books.map((book, i) => {
        return (
          <li key={i}>
            <Book
              book={book}
              handleChangeShelf={handleChangeShelf}
            />
          </li>
        )
      })}
    </ol>
  );
}

export default BooksList;
import React from 'react';
import BooksList from './BooksList';
import { Ring } from 'react-spinners-css';

const BookShelf = props => {
  const { title, books, loading, handleChangeShelf } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        {loading ? (
          <Ring color="#2e7c31" size={70} />
        ) : (
            books.length > 0 ? (
              <BooksList
                books={books}
                handleChangeShelf={handleChangeShelf}
              />
            ) : (
                <p className="no-found">You don't have any book in this shelf.</p>
              )
          )}
      </div>
    </div>
  );
}

export default BookShelf;
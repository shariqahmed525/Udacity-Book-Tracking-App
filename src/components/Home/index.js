import React from 'react'
import BookShelf from '../BookShelf';
import { Link } from 'react-router-dom';

const shelves = [
  {
    key: "currentlyReading",
    title: "Currently Reading",
  },
  {
    key: "wantToRead",
    title: "Want to Read",
  },
  {
    key: "read",
    title: "Read",
  },
];

const Home = props => {
  const { books, loading, handleChangeShelf } = props;
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map(shelf => (
            <BookShelf
              key={shelf.key}
              loading={loading}
              title={shelf.title}
              handleChangeShelf={handleChangeShelf}
              books={books.filter(v => v.shelf === shelf.key)}
            />
          ))}
        </div>
      </div>
      <div className="open-search-wrapper">
        <Link
          to='/search'
          className="open-search"
        />
      </div>
    </div>
  );
}

export default Home;
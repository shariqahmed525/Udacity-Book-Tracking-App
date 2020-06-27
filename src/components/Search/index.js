import React, { Component } from 'react'
import _ from 'lodash';
import BooksList from '../BooksList';
import { Link } from 'react-router-dom';
import { Ring } from 'react-spinners-css';
import * as BooksAPI from '../../BooksAPI';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      searchedBooks: [],
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const text = target.value;
    this.setState({ text });
    if (text) {
      this.searchBooks(text);
    }
  }

  searchBooks = (text) => {
    this.setState({ loading: true })
    BooksAPI
      .search(text)
      .then(res => this.setState({
        loading: false,
        searchedBooks: (res && res.length > 0) ? res.filter(v => this.filterBooks(v)) : [],
      }));
  }

  filterBooks = (v) => {
    if ((v.authors && v.imageLinks)) {
      return this.markShelf(v);
    }
  }

  markShelf = (v) => {
    const { books } = this.props
    const find = _.find(books, o => o.id === v.id);
    if (find) {
      v.shelf = find.shelf;
      return v;
    }
    return v;
  }

  componentDidUpdate(prevProps) {
    const { text, searchedBooks } = this.state;
    if (text) {
      const { books } = this.props;
      const { books: prevBooks } = prevProps;
      if (prevBooks !== books) {
        this.setState({
          searchedBooks: searchedBooks.map(v => this.markShelf(v))
        });
      }
    }
  }

  render() {
    const { handleChangeShelf } = this.props;
    const { text, searchedBooks, loading } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className="close-search"
          />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={text}
              onChange={this.handleChange}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        {text !== "" && (
          loading ? (
            <div className="search-books-results align-center">
              <Ring color="#2e7c31" size={70} />
            </div>
          ) : (
              <div className="search-books-results">
                {searchedBooks.length > 0 ? (
                  <BooksList
                    books={searchedBooks}
                    handleChangeShelf={handleChangeShelf}
                  />
                ) : (
                    <p className="no-found">No search found of "{text}"</p>
                  )}
              </div>
            )
        )}
      </div>
    );
  }
}

export default Search;
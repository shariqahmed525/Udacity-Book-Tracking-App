import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Search from "../components/Search";
import * as BooksAPI from '../BooksAPI';

const history = createBrowserHistory();

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      loading: true,
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    BooksAPI
      .getAll()
      .then(books => this.setState({
        books,
        loading: false
      }))
  }

  handleChangeShelf = () => {
    this.getBooks();
  }

  render() {
    const { books, loading } = this.state
    return (
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Home
                books={books}
                loading={loading}
                handleChangeShelf={this.handleChangeShelf}
                {...props}
              />
            )}
          />
          <Route
            path="/search"
            render={props => (
              <Search
                books={books}
                loading={loading}
                handleChangeShelf={this.handleChangeShelf}
                {...props}
              />
            )}
          />
        </Switch>
      </Router>
    )
  }
}

export default Routes;
import React from 'react'
import * as BooksAPI from './BooksAPI'
import SearchPage from './components/SearchPage'
import { Route, Routes } from 'react-router-dom';
import ListBooks from './components/ListBooks';
import './App.css'

class BooksApp extends React.Component {
  state = {
    showSearchPage: true,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  filterBooks = (shelfType) => {
    return this.state.books.filter(book =>
      (book.shelf === shelfType))
  }

  updatedBookList = (prevState, updatedBook, shelf) => {

    let isNew = true;
    let newBooks = prevState.books.map(book => {
      if (book.id === updatedBook.id) {
        isNew = false;
        return { ...book, shelf: shelf }
      }
      return book;
    })

    if (isNew) {
      updatedBook.shelf = shelf
      newBooks.push(updatedBook)
    }
    return newBooks;

  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        this.setState((prevState) => ({
          books: this.updatedBookList(prevState, book, shelf)
        }))
      })
  }

  render() {
    return (
      <div className="app">
        <Routes>
          <Route
            exact
            path="/"
            element={
            <ListBooks filterBooks={this.filterBooks} updateBook={this.updateBook}/>
          }
          />
          <Route
            path="/search"
            element={
            <SearchPage updateBook={this.updateBook}/>
          }            
          />
        </Routes>
      </div>
    )
  }
}

export default BooksApp

import React from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './components/BookShelf'
import SearchPage from './components/SearchPage'
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
        {this.state.showSearchPage ? (
          <SearchPage updateBook={this.updateBook} close={() => this.setState({ showSearchPage: false })} />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf bookShelfTitle="Current Readings" books={this.filterBooks('currentlyReading')} updateBook={this.updateBook} />
                <BookShelf bookShelfTitle="Want to Read" books={this.filterBooks('wantToRead')} updateBook={this.updateBook} />
                <BookShelf bookShelfTitle="Read" books={this.filterBooks('read')} updateBook={this.updateBook} />
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp

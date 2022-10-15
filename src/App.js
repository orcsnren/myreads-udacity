import React from 'react' 
import * as BooksAPI from './BooksAPI'
import BookShelf from './components/BookShelf'
import './App.css'

class BooksApp extends React.Component {
  state = {
    showSearchPage: true,
    books : [],
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
  
  updatedBookList = (updatedBook, shelf) => {
    let newBooks = this.state.books.map(book => {
      if(book.id === updatedBook.id){
          return {...book , shelf : shelf}
      }
      return book;
    })

   return newBooks;
    
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book,shelf)
    .then(() => {
      this.setState((currentState) => ({
        books: this.updatedBookList(book, shelf)
      }))
    })
  }


  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf bookShelfTitle="Current Readings" books={this.filterBooks('currentlyReading')} updateBook = {this.updateBook}/>
                <BookShelf bookShelfTitle="Want to Read" books={this.filterBooks('wantToRead')} updateBook = {this.updateBook}/>
                <BookShelf bookShelfTitle="Read" books={this.filterBooks('read')} updateBook = {this.updateBook}/>
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

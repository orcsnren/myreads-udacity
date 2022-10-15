import React from 'react';
import * as BooksAPI from '../BooksAPI'

class SearchPage extends React.Component {

    state = {
        query: '',
        books: []
    }

    updateQuery = (query) => {
        BooksAPI.search(query.trim())
            .then((books) => {
                if (books.error) {
                    this.setState(prevState => ({...prevState, books: [], query: query.trim()}))
                } else {
                    this.setState(prevState => ({...prevState, books: books, query: query.trim()}))
                }
            })
    }

    updateBookShelf = (event, book) => {
        this.props.updateBook(book, event.target.value);
    }

    render() {

        const { close } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={close}>Close</button>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} />
                    </div>
                </div>
                {(this.state.query !== '' && this.state.books.length > 0) ? (
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {this.state.books.map((book) => (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                            <div className="book-shelf-changer">
                                                <select onChange={event => this.updateBookShelf(event, book)} value={book.shelf}>
                                                    <option value="move" disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">
                                            {book.authors ? book.authors.join(', ') : 'Unknown Author'}
                                        </div>)
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                ) : null
                }
            </div>
        )
    }
}
export default SearchPage
import React from 'react';
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom';
import Book from './Book'

class SearchPage extends React.Component {

    state = {
        query: '',
        books: []
    }

    updateQuery = (query) => {
        BooksAPI.search(query.trim())
            .then((books) => {
                if (books.error) {
                    this.setState(prevState => ({ ...prevState, books: [], query: query.trim() }))
                } else {
                    this.setState(prevState => ({ ...prevState, books: books, query: query.trim() }))
                }
            })
    }

    updateBookShelf = (event, book) => {
        this.props.updateBook(book, event.target.value);
    }

    render() {

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} />
                    </div>
                </div>
                {(this.state.query !== '' && this.state.books.length > 0) ? (
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {this.state.books.map((book) => (
                               <Book key={book.id} book={book} updateBookShelf={this.updateBookShelf}/>                                    
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
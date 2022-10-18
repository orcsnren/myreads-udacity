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
        this.setState(() => ({ query: query }))

        if (query) {
            BooksAPI.search(query.trim())
                .then((books) => {
                    if (books.error) {
                        this.setState(() => ({ books: [] }))
                    } else {
                        this.matchWithMyBooks(books)
                        this.setState(() => ({ books: books }))
                    }
                })
        } else {
            this.setState(() => ({
                books: []
            }));
        }

    }

    updateBookShelf = (event, book) => {
        this.props.updateBook(book, event.target.value);
    }

    matchWithMyBooks = (books) => {
        books.forEach((book) => {
            book.shelf = 'none';
            this.props.myBooks.forEach((myBook) => {
                if (myBook.id === book.id) {
                    book.shelf = myBook.shelf;
                }
            });
        });
        return books;
    };

    render() {
        const { query, books } = this.state

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close</button>
                    </Link>

                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)} />
                    </div>
                </div>
                {books.length > 0 && (
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {this.state.books.map((book) => (
                                <Book key={book.id} book={book} updateBookShelf={this.updateBookShelf} />
                            ))}
                        </ol>
                    </div>
                )
                }
            </div>
        )
    }
}
export default SearchPage
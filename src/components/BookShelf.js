import React from 'react'

class BookShelf extends React.Component {

    updateBookShelf = (event, book) => {
        this.props.updateBook(book, event.target.value);
    }

    render() {

        const { bookShelfTitle, books } = this.props

        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{bookShelfTitle}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books.map((book) => (
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
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}
export default BookShelf
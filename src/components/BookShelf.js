import React from 'react'
import Book from './Book'

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
                                <Book key={book.id} book={book} updateBookShelf={this.updateBookShelf}/>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}
export default BookShelf
import React from 'react';


const Book = ({ book, updateBookShelf }) => (

    <li key={book.id}>
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : null})` }}></div>
                <div className="book-shelf-changer">
                    <select onChange={event => updateBookShelf(event, book)} value={book.shelf}>
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
)
export default Book;
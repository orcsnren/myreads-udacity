import React from 'react';
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom';

const ListBooks = ({ filterBooks, updateBook }) => (

    <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                <BookShelf bookShelfTitle="Current Readings" books={filterBooks('currentlyReading')} updateBook={updateBook} />
                <BookShelf bookShelfTitle="Want to Read" books={filterBooks('wantToRead')} updateBook={updateBook} />
                <BookShelf bookShelfTitle="Read" books={filterBooks('read')} updateBook={updateBook} />
            </div>
        </div>
        <div className="open-search">
            <Link to="search">
                <button>Add a Book</button>
            </Link>
        </div>
    </div>

)
export default ListBooks;
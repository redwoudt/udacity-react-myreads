import React from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './bookshelf'

const BOOK_SHELVES = { 
  'Currently Reading': 'currentlyReading',
  'Want to Read': 'wantToRead', 
  'Read': 'read',
}

class Bookcase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
    this.update = this.update.bind(this);
  }

  update(book) {
    this.props.update(book);
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content"> 
          <Bookshelf update={this.update} bookshelves={BOOK_SHELVES} books={this.props.books} />
        </div>
        <div className="open-search">
          <Link to="/search" className="add-book">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Bookcase

import React from 'react'
import Book from './book'

class ListBooks extends React.Component {
  constructor(props){
    super(props);
    this.update = this.update.bind(this);
  }
  
  update(book) {
    this.props.update(book);
  }
  
  render() {
    return (
      <ol className="books-grid">
      {
        this.props.books.map((book)=>(
          <li key={book.id} className="book-list-name">
            <Book book={book} update={this.update}/>
          </li>
        ))
      }
      </ol>
    )
  }
}

export default ListBooks
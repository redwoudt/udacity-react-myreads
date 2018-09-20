import React from 'react'
import Book from './book'

const ListBooks = ({update, books}) => (
  <ol className="books-grid">
  {
    books.map((book)=>(
      <li key={book.id} className="book-list-name">
        <Book book={book} update={update}/>
      </li>
    ))
  }
  </ol>
)

export default ListBooks;


import React from 'react'
import ListBooks from './listbooks'

class Bookshelf extends React.Component {
  constructor(props){
    super(props);
    this.update = this.update.bind(this);
  }
  
  update(book){
    this.props.update(book);
  }

  render() {
    const {bookshelves} = this.props;
    return (
      <ol className="Categories">
      {
        Object.keys(bookshelves).map((bookshelf) => (
          <li key={bookshelf} className="books-in-shelf">
            <div className="bookshelf">
             <h2 className="bookshelf-title">{bookshelf}</h2>
             <ListBooks update={this.update} books={ 
               this.props.books.filter(book => book.shelf === bookshelves[bookshelf])
              } 
             />
            </div>
          </li>
        ))
      }
      </ol>
    )
  }
}

export default Bookshelf

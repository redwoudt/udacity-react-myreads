import React from 'react'
import * as BooksAPI from './BooksAPI'

class BookshelfChanger extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      book: {}
    }
    this.OnChange = this.OnChange.bind(this);
  }

  componentDidMount() { 
    // check if shelf is set for book to be displayed, if not obtain it for the specific book
    if (this.props.book.shelf === undefined) {
      BooksAPI.get(this.props.book.id)
      .then((book) => {
        this.setState(() => ({ book }))
    })    
    } else {
      this.setState({book: this.props.book});
    }
  }

  OnChange(event) {
    const shelf = event.target.value;
    BooksAPI.update(this.props.book, shelf).then(() => {
      this.setState(prevState => ({
        book: {
          ...prevState.book,
          shelf: shelf
        }
      }))
      this.props.update(this.state.book);
    })
  }
  
  render(){
    return (
      <div className="book-shelf-changer">
        <select onChange={this.OnChange} value={this.state.book.shelf}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
         </select>
      </div>
    )
  }
}

export default BookshelfChanger
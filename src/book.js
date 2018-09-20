import BookshelfChanger from './bookshelfchanger'
import React from 'react'

class Book extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        book: {},
    }
    this.update = this.update.bind(this)
  }
  
  /**
  * @description Update state, used as callback function
  */
  update(book) {
    this.setState({book});
    this.props.update(book);
  }

  /**
  * @description render function
  */
  render() {
    const {book, update} = this.props;
    const {imageLinks, title, authors} = book;
    const placeholder = "http://via.placeholder.com/128x193?text=No%20Cover";
    const thumbnail =  imageLinks ? imageLinks.thumbnail : placeholder;
    return ( 
      <div className="book">
        <div className="book-top">
          <div className="book-cover" 
               style={{width: '100%', 
                       height: '100%', 
                       resizeMode: 'cover', 
                       backgroundImage: `url(${thumbnail})` 
                     }}>
          </div>
          <BookshelfChanger book={book} update={update}/>
        </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">
        {authors ? authors.join(', ') : 'Author Unknown'}
      </div>
      </div>
    )
  }
}

export default Book;
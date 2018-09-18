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
    let thumbnail = '';
    try {
      thumbnail = this.props.book.imageLinks.thumbnail;
    } catch (e) {
      // no need to do anything here
    }

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
          <BookshelfChanger book={this.props.book} update={this.update}/>
        </div>
      <div className="book-title">{this.props.book.title}</div>
      <div className="book-authors"><ul>{this.props.book.authors}</ul></div>
      </div>
    )
  }
}

export default Book
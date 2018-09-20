import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './listbooks'
import { Link } from 'react-router-dom'

const SEARCH_SUGGESTIONS = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'];

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      suggestions: SEARCH_SUGGESTIONS,
      books: [],
    }
    this.update = this.update.bind(this);
  }

  /**
  * @description Provided list of suggestions based on current search query 
  * @returns {list} Suggestion terms based on search query
  */
  provideSuggestions = () => {
    return this.state.suggestions.filter((suggestion) => {
      return suggestion.toLowerCase().includes(this.state.query.toLowerCase()) ;
    });
  }

  /**
  * @description Provide list of exact matches with value 
  * @param {string} value to check
  * @returns {list} exact matches from suggested terms for value
  */
  provideMatches = (value) => {
    return this.state.suggestions.filter((suggestion) => {
      return suggestion.toLowerCase() === value.toLowerCase() ;
    });
  }

  /**
  * @description Provide list of exact matches with value 
  * @param {string} value to check
  * @returns {list} exact matches from suggested terms for value
  */
  search = (term) => {
    BooksAPI.search(term,30)
    .then((books) => {
      if(books){
        if(books.length>0){
          const results = books.map((book) => {
            const existingBook = this.props.books.find((b) => b.id === book.id)
            book.shelf = existingBook ? existingBook.shelf : "none"
            return book
          })
          this.setState({ books: results })
        }
        else {
          this.clearBooks();
        }
      }
      else {
          this.clearBooks();
        }
    })
    .catch(error => {
      this.clearBooks();
    });
  }

  clearBooks() {
    this.setState({books: []})
  }

  searchAllMatches = (matches) => {
    matches.map(m => {
      return this.search(m);
    })
  }

  updateQuery = (value) => {
    this.setState({
      query: value,
    })
    this.search(value);
  }

  OnChange = (event) => {
   this.updateQuery(event.target.value);
  }

  update(value) {
    this.props.update(value);
  }

  render() {
   return (
     <div className="search-books">
       <div className="search-books-bar">
         <Link to="/" className="close-search">Close</Link>
         <div className="search-books-input-wrapper" style={{'background': '#fff'}}>
           <input 
             type="text" 
             placeholder="Search by title or author"
             value={this.state.query}
             onChange={(event) => this.OnChange(event)}
           />
           <select onChange={this.OnChange} value={this.state.query}>
             <option value="search" disabled>Selectable search terms...</option>
             {this.provideSuggestions().map((x,y) => <option key={y}>{x}</option>)}
           </select>
           <ListBooks update={this.update} books={this.state.books} />
         </div>
       </div>
       <div className="search-books-results">
         <ol className="books-grid"></ol>
       </div>
     </div>
    ) 
  }
}

export default Search;
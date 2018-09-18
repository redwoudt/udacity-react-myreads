import './App.css'
import Bookcase from './bookcase'
import React from 'react'
import { Route } from 'react-router-dom'
import Search from './search'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  constructor(props){
    super(props);
    this.requestAllBooks = this.requestAllBooks.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      books: []
    }
  }
  
  componentDidMount() { 
    this.requestAllBooks();
  }
  
  /**
  * @description obtain all books available through API
  */
  requestAllBooks(){
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({ books }))
    })
  }
  /**
  * @description Update state, used as callback function
  */
  update(book=undefined){
    if (book !== undefined){
     this.setState(state => ({
       books: this.state.books.filter(b => b.id !== book.id).concat(book)
     }))
    }
    this.forceUpdate();
  }

  /**
  * @description render function
  */
  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <Search update={this.update} books={this.state.books}/>
         )}/>
        <Route exact path='/' render={() => (
          <Bookcase update={this.update} books={this.state.books}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp

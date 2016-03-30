import React from 'react';
import BookList from './BookList';

class BooksLent extends React.Component{
  render(){
    return <div>
      <h3>Books lent out</h3>
      <BookList books={this.props.booksLent}/>
    </div>
  }
}
export default BooksLent;
import React from 'react';
import BookList from './BookList';

class BooksBorrowed extends React.Component{
  render(){
    return <div>
      <h3>Books borrowed</h3>
      <BookList books={this.props.booksBorrowed}/>
    </div>
  }
}
export default BooksBorrowed;
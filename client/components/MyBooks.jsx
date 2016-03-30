import React from 'react';
import BookList from './BookList';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import DebounceInput from 'react-debounce-input';

import Preloader from './Preloader';

export const MyBooks = class MyBooks extends React.Component{
  constructor(props){
    super(props);
  }
  getBooks(){
    return this.props.foundBooks || [];
  }
  render(){
    return <div className="my-books">
      <h3>Add Books</h3>
      <DebounceInput debounceTimeout={200} type="text" placeholder="Search for a book" onChange={(event) =>{this.props.fetchBooks(event.target.value)}}/>
      {this.props.loading ? <Preloader/> : null}

      {this.getBooks().length > 0 ?
        <div><h4>Found books from search: </h4><BookList books={this.getBooks()}/></div> :
        null}

      <h3>My books </h3>
      {this.props.myBooks ? <BookList books={this.props.myBooks}/> : null}
    </div>
  }
}

function mapStateToProps(state){
  return {
    foundBooks: state.myLibrary.get('foundBooks'),
    myBooks: state.myLibrary.get('myBooks'),
    loading: state.myLibrary.getIn(['loading', 'foundBooks'])
  }
}

export const MyBooksContainer = connect(
  mapStateToProps,
  actionCreators
)(MyBooks);

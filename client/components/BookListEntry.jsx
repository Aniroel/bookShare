import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const BookListEntry = class BooksListEntry extends React.Component{
  formatDescription(){
    var description = this.props.description;
    if(description && description.length > 150){
      return description.slice(0, 150) + '...more';
    }
    return description;
  }
  render(){
    if(!this.props.hasOwnProperty('title')) return null;
    return <div className="book-entry">
      <p class="title">{this.props.title}</p>
      <p>{this.props.author}</p>
      <p>{this.formatDescription()}</p>
      <img src={this.props.image}/>
      <p>{this.props.genre}</p>
      {this.props.borrower ?
        <p>Lent to: {this.props.borrower}</p> : null}
      {this.props.owner ?
      <p>Borrowed from: {this.props.owner}</p> : null}
      {this.props.searchedBook ?
        <button onClick={() => {this.props.addBookToMyShelf(this.props); }}>Add to my Library</button>
        : null}
      {this.props.ownerId ? <div>
          <p>Owner: {this.props.ownerName}</p>
          <button onClick={() => this.props.borrowBook({bookId: this.props})}>Borrow book</button>
        </div> : null}
    </div>;
  }
}
function mapStateToProps(){
  return {};
}

export const BookListEntryContainer = connect(
  mapStateToProps,
  actionCreators
)(BookListEntry);
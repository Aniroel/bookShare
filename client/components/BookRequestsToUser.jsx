import React from 'react';

import {BookRequestListEntryContainer} from './BookRequestListEntry';

export const BookRequestsToUser = class BookRequestsToUser extends React.Component{
  render(){
    if(this.props.bookRequests && this.props.bookRequests.length > 0){
      return <div className="book-requests">
        <h3>Books your friends want to borrow</h3>
        <ul className="requests-list">
        {
          this.props.bookRequests ?
          this.props.bookRequests.map((bookRequest) => {
            return <BookRequestListEntryContainer {...bookRequest}/>
        }) : null}
        </ul>
      </div>
    } else {
      return <div></div>
    }
  }
}
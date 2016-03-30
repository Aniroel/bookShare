import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const BookRequestListEntry = class BookRequestListEntry extends React.Component{
  render(){
    return <li>
      <p>{this.props.username} wants to borrow:</p>
      <p>{this.props.title}</p>
      BookRequestId: {this.props.BookRequestId}
      <button onClick={() =>{ this.props.acceptBookRequest(this.props.BookRequestId)}}>Accept</button>
      <img src={this.props.image}/>
    </li>
  }
}

function mapStateToProps(state){
  return {}
}

export const BookRequestListEntryContainer = connect(
  mapStateToProps, 
  actionCreators
)(BookRequestListEntry);
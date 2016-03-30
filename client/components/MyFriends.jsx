import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import DebounceInput from 'react-debounce-input';
import PeopleList from './PeopleList';
import BookList from './BookList';
import Preloader from './Preloader';

export const MyFriends = class MyFriends extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.props.getMyFriends();
  }
  componentWillUpdate(){
    console.log('UPDATING MyFriends');
  }
  render(){
    return <div>
      <h3>Friends</h3>
      {this.props.friends ? this.props.friends.map((friend) => {
        return <li onClick={ (event) => {this.props.viewFriendBooks(friend.id)} }>
          ID: {friend.id}  EMAIL: {friend.email}
        </li>
      }) : null}
      <h4>Find and add friends</h4>
      <DebounceInput debounceTimeout={200} type="text" placeholder="Enter an email or username" onChange={(event) => this.props.searchUsers(event.target.value)}/>
      { this.props.loading ? <Preloader/> : null}
      <PeopleList peopleList={this.props.foundUsers}/>
      <BookList books={this.props.selectedFriendBooks}/>
    </div>
  }
}
function mapStateToProps(state){
  return {
    friends: state.friends.get('friends'),
    foundUsers: state.friends.get('foundUsers'),
    loading: state.friends.getIn(['loading', 'foundUsers']),
    selectedFriendBooks: state.friends.get('selectedFriendBooks')
  }
}

export const MyFriendsContainer = connect(
  mapStateToProps,
  actionCreators
)(MyFriends);
import React from 'react';
import {NavBarContainer} from './NavBar';
import {MyFriendsContainer} from './MyFriends';
import {FriendRequestsContainer} from './FriendRequests';

import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const Friends = class Friends extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    if(!localStorage.token){
      hashHistory.push('/signIn');
    }
    console.log('Mounting Friends');
  }
  componentWillUpdate(){
    console.log('Updating Friends');
  }
  render(){
    return <div>
        <NavBarContainer/>
        <div className="innerDiv">
          <FriendRequestsContainer/>
          <MyFriendsContainer/>
        </div>
      </div>
  }
}

function mapStateToProps(state){
  return {
    friends: state.friends.get('friends'),
    foundUsers: state.friends.get('foundUsers'),
    loading: state.friends.getIn(['loading', 'foundUsers']),
    bookRequestsToUser: state.myLibrary.getIn(['bookRequests', 'toUser'])
  }
}

export const FriendsContainer = connect(
  mapStateToProps,
  actionCreators
)(Friends);




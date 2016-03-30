import React from 'react';
import * as actionCreators from '../action_creators';
import {connect} from 'react-redux';

export const FriendRequests = class FriendRequests extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.props.getFriendRequestsDoneToMe();
  }
  render(){
    if(this.props.friendRequests && this.props.friendRequests.length > 0){
      return <div>
        <h3>Friend Requests</h3>
        { this.props.friendRequests ? this.props.friendRequests.map((friendRequest) => {
          return <p>{friendRequest.username} wants to be your friend
          <button onClick={(event) =>
            { this.props.acceptFriendRequest(friendRequest.FriendRequestId);} 
            }>Accept
            </button><button onClick={(event) =>
            { this.props.declineFriendRequest(friendRequest.FriendRequestId);}
            }>Decline</button></p>;
        }) : null}
      </div>;
    } else {
      return <div></div>;
    }
  }
}

function mapStateToProps(state){
  return {
    friendRequests: state.friends.get('friendRequests')
  }
}

export const FriendRequestsContainer = connect(
  mapStateToProps,
  actionCreators
)(FriendRequests);

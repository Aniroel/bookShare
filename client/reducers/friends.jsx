import {searchGoogleBooksAJAX} from '../searchBooks';
import {Map} from 'immutable'
import {isNullUndefinedOrEmpty} from '../helpers/util';

function setState(state = Map(), newState){
  return state.merge(newState);
}

function clearState(state){
  return Map();
}

function startGettingMyFriends(state){
  //TODO start spinner
  state.setIn(['loading','myFriends']);
  return state;
}

function finishGettingMyFriends(state, friends){
  return state.set('friends', friends);
}

function startSearchUsers(state, query){
  if(isNullUndefinedOrEmpty(query)){
    state = state.setIn(['loading', 'foundUsers'], false);
  } else {
    state = state.setIn(['loading', 'foundUsers'], true);
  }
  return state;
}

function finishSearchUsers(state, users){
  state = state.setIn(['loading', 'foundUsers'], false);
  return state.set('foundUsers', users);
}

function finishGettingFriendRequestToMe(state, friendRequests){
  return state.set('friendRequests', friendRequests);
}

function finishDeclineFriendRequest(state, friendRequestId){
  var friendRequests = state.get('friendRequests');
  var newFriendRequests = [];
  for(var i=0; i < friendRequests.length; i++){
    if(friendRequests[i].FriendRequestId !== friendRequestId){
      newFriendRequests.push(friendRequests[i]);
    }
  }
  return state.set('friendRequests', newFriendRequests);
}

function finishAcceptFriendRequest(state, friendRequestId){
  var friendRequests = state.get('friendRequests');
  var newFriendRequests = [];
  for(var i=0; i < friendRequests.length; i++){
    if(friendRequests[i].FriendRequestId !== friendRequestId){
      newFriendRequests.push(friendRequests[i]);
    }
  }
  return state.set('friendRequests', newFriendRequests); 
}

function finishGettingFriendBooks(state, books){
  console.log('Friend books' + books);
  return state.set('selectedFriendBooks', books);
}

export default function(state = Map(), action){
  switch(action.type){
    case 'SET_STATE':
      return setState(state, action.state);
    case 'CLEAR_STATE':
      return clearState(state);
    case 'FINISH_GET_MY_FRIENDS':
      return finishGettingMyFriends(state, action.friends);
    case 'START_SEARCH_USERS':
      return startSearchUsers(state, action.query);
    case 'FINISH_SEARCH_USERS':
      return finishSearchUsers(state, action.users);
    case 'FINISH_GETTING_FRIEND_REQUESTS_TO_ME':
      return finishGettingFriendRequestToMe(state, action.friendRequests);
    case 'FINISH_DECLINE_FRIEND_REQUEST':
      return finishDeclineFriendRequest(state, action.friendRequestId);
    case 'FINISH_ACCEPT_FRIEND_REQUEST':
      return finishAcceptFriendRequest(state, action.friendRequestId);
    case 'FINISH_GETTING_FRIEND_BOOKS':
      return finishGettingFriendBooks(state, action.books);
    default:
      return setState(state);
  }
}


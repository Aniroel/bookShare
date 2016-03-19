import {Map, List, fromJS} from 'immutable';
// import {searchBooks} from './searchBooks';

function setState(state, newState){
  return state.merge(newState);
}


function setFoundBooks(state, foundBooks){
  return state.set('foundBooks', foundBooks);
}

function regularLogin(state){
  //TODO make login GET request
  var username = state.getIn(['userInfo', 'username']);
  var password = state.getIn(['userInfo','password']);
  $.ajax({
    url: '/api/signIn',
    method: 'POST',
    data: {username: username, password: password},
    success: function(res){
      console.log('GOT RESPONSE, USER LOGGED IN');
    },
    error: function(err){
      console.log('ERROR, USER NOT LOGGED IN')
      console.error(err);
    }
  });
}

function regularSignUp(state, info){
  var username = state.getIn(['userInfo', 'username']);
  var email = state.getIn(['userInfo','email']);
  var password = state.getIn(['userInfo','password']);
  var passwordConfirmation = state.getIn(['userInfo','passwordConfirmation']);
  if(password !== passwordConfirmation) return state.set('errorMessage', 'Passwords do not match');
    $.ajax({
      url: '/api/signUp',
      method: 'POST',
      data: {username: username, password: password, email: email},
      success: function(res){
        console.log('GOT RESPONSE, USER SIGNED UP')
      },
      error: function(err){
        console.log('ERROR, USER NOT SIGNED UP')
        console.error(err);
      }
    });
}

function facebookLogin(state){
  //TODO make facebookLogin GET request
  $.ajax({
    url: '/login/facebook',
    method: 'POST',
    success: function(res){
      console.log(res);
    },
    error: function(err){
      console.error(err);
    }
  })
}

function searchBooks(title){
  // searchBook(title, function(response){

  // });
}

export default function(state = Map(), action){
  switch(action.type){
    case 'SET_STATE':
      return setState(state, action.state);
    case 'SET_PASSWORD':
      return setPassword(state, action.password);
    case 'SET_PASSWORD_CONFIRMATION':
      return setPasswordConfirmation(state, action.password);
    case 'SET_USERNAME':
      return setUsername(state, action.username);
    case 'SET_EMAIL':
      return setEmail(state, action.email);
    case 'SET_FOUND_BOOKS':
      return setFoundBooks(state, action.foundBooks);
    case 'REGULAR_LOGIN':
      return regularLogin(state);
    case 'REGULAR_SIGNUP':
      return regularSignUp(state);
    case 'FACEBOOK_LOGIN':
      return facebookLogin(state);
  }
}
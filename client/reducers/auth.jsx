import {hashHistory} from 'react-router';
import {Map} from 'immutable';
import {isNullUndefinedOrEmpty} from '../helpers/util';

function getUserData(state){
  var username = state.getIn(['userInfo', 'username']);
  var email = state.getIn(['userInfo','email']);
  var password = state.getIn(['userInfo','password']);
  var passwordConfirmation = state.getIn(['userInfo','passwordConfirmation']);
  return {
    username: username,
    email: email,
    password: password,
    passwordConfirmation: passwordConfirmation,
  }
}

function setState(state = Map(), newState){
  return state.merge(newState);
}

function clearState(state){
  return Map();
}

function setPassword(state, password){
  return state.setIn(['userInfo','password'], password);
}

function setPasswordConfirmation(state, username){
  return state.setIn(['userInfo','passwordConfirmation'], username);
}

function setUsername(state, username){
  return state.setIn(['userInfo','username'], username);
}

function setEmail(state, email){
  return state.setIn(['userInfo','email'], email);
}

function startSignIn(state, username, password){
  //TODO activate Spinner for better UX
  if(isNullUndefinedOrEmpty(username)){
    state = state.setIn(['displayValidationMessage', 'signIn', 'username'], true);
  } else {
    state = state.setIn(['displayValidationMessage', 'signIn', 'username'], false);
  }
  if(isNullUndefinedOrEmpty(password)){
    state = state.setIn(['displayValidationMessage', 'signIn', 'password'], true);
  } else {
    state = state.setIn(['displayValidationMessage', 'signIn', 'password'], false);
  }
  return state;
}

function endSignIn(state, token, username){
  localStorage.setItem('token', token);
  localStorage.setItem('displayName', username);
  hashHistory.push('/explore');
  state = state.setIn(['userInfo', 'displayName'], username);
  return state.setIn(['userInfo', 'token'], token);
}

function checkInput(state, key, input){
  if(isNullUndefinedOrEmpty(input)){
    state = state.setIn(['displayValidationMessage', 'signUp', key], true);
  } else {
    state = state.setIn(['displayValidationMessage', 'signUp', key], false);
  }
  return state;
}

function startRegularSignUp(state){
  var username = state.getIn(['userInfo', 'username']);
  var email = state.getIn(['userInfo','email']);
  var password = state.getIn(['userInfo','password']);
  var passwordConfirmation = state.getIn(['userInfo','passwordConfirmation']);
  state = checkInput(state, 'username', username);
  state = checkInput(state, 'email', email);
  state = checkInput(state, 'password', password);
  state = checkInput(state, 'passwordConfirmation', passwordConfirmation);
  return state;
}

function finishRegularSignUp(state, response){
  localStorage.setItem('token', response.token);
  localStorage.setItem('displayName', response.displayName);
  hashHistory.push('/explore');
  console.log('GOT RESPONSE, USER SIGNED UP');
  return state;
}


export default function(state = Map(), action){
  switch(action.type){
    case 'SET_STATE':
      return setState(state, action.state);
    case 'CLEAR_STATE':
      return clearState(state);
    case 'SET_USERNAME':
      return setUsername(state, action.username);
    case 'SET_PASSWORD':
      return setPassword(state, action.password);
    case 'SET_PASSWORD_CONFIRMATION':
      return setPasswordConfirmation(state, action.password);
    case 'SET_EMAIL':
      return setEmail(state, action.email);
    case 'START_REGULAR_SIGNUP':
      return startRegularSignUp(state, action.userData);
    case 'FINISH_REGULAR_SIGNUP':
      return finishRegularSignUp(state, action.token);
    case 'REGULAR_SIGNUP':
      return regularSignUp(state);
    case 'START_SIGNIN':
      return startSignIn(state, action.username, action.password);
    case 'END_SIGNIN':
      return endSignIn(state, action.token, action.username);
    default:
      return setState(state);
  }
}














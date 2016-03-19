import {Map, List, fromJS} from 'immutable';
// import {searchBooks} from './searchBooks';
import {setPassword, setPasswordConfirmation, setUsername, setEmail, regularLogin, regularSignUp} from './reducers/authReducers';
import {setFoundBooks, searchBooks} from './reducers/dashboardReducers';

function setState(state, newState){
  return state.merge(newState);
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
    case 'REGULAR_LOGIN':
      return regularLogin(state);
    case 'REGULAR_SIGNUP':
      return regularSignUp(state);
    case 'SET_FOUND_BOOKS':
      return setFoundBooks(state, action.foundBooks);
    case 'SEARCH_BOOKS':
      return searchBooks(state, action.query);
  }
}
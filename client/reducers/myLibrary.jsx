import {searchGoogleBooksAJAX} from '../searchBooks';
import {Map} from 'immutable'
import {isNullUndefinedOrEmpty} from '../helpers/util';

function setState(state = Map(), newState){
  return state.merge(newState);
}

function clearState(state){
  return Map();
}

function getMyBooks(state){
  return state.setIn(['loading', 'myBooks'], true);
}

function finishGetMyBooks(state, books){
  state.setIn(['loading', 'myBooks'], false);
  return state.set('myBooks', books);
}

function formatBooksResponse(response){
  if(!response.hasOwnProperty('items')) {
      console.error('No items found for that query');
      return;
  }
    var books = [];
    var currentBook = {};
    var isbn10, isbn13, image;
    for(var i=0;i<response.items.length; i++){
      var info = response.items[i].volumeInfo;
      if(info){
        var identifiers = info.industryIdentifiers;
        isbn10 = null,
        isbn13 = null;
        if(identifiers && identifiers[1] && identifiers[1].type === 'ISBN_10'){
          isbn10 = identifiers[1].identifier;
        }
        if(identifiers && identifiers[0] && identifiers[0].type === 'ISBN_13'){
          isbn13 = identifiers[0].identifier;
        }
        if(info.imageLinks){
          image = info.imageLinks.thumbnail;
        }
        currentBook = {
          title: info.title,
          description: info.description,
          authors: JSON.stringify(info.authors),
          categories: JSON.stringify(info.categories),
          image: image,
          isbn10: isbn10,
          isbn13: isbn13,
          searchedBook: true
        }
        books.push(currentBook);
      }
    }
  return books;
}


function requestBooks(state, query){
  //TODO set message or spinner to show user that we are fetching the books
  if(isNullUndefinedOrEmpty(query)){
    state = state.setIn(['loading', 'foundBooks'], false)
  } else {
    state = state.setIn(['loading', 'foundBooks'], true)
  }
  return state;
}

function receiveBooks(state, books){
  //TODO stop spinner or hide fetching message
  console.log('FINISHED LOADING');
  var newState = state.setIn(['loading', 'foundBooks'], false);
  var formattedBooks = formatBooksResponse(books);
  return newState.set('foundBooks', formattedBooks);
}

function setFoundBooks(state, foundBooks){
  return state.set('foundBooks', foundBooks);
}

/* Make book request reducers  */
function startBookRequest(state){
  //TODO Start spinner
  return state;
}

function finishBookRequest(state){
  //TODO Stop spinner
  return state;
}

function startGettingBookRequestsToUser(state){
  //TODO start spinner
  return state;
}

function finishGettingBookRequestsToUser(state, bookRequests){
  //TODO stop spinner
  return state.setIn(['bookRequests', 'toUser'], bookRequests);
}

function startGettingBooksLent(state){
  //TODO start spinner
  return state;
}

function finishGettingBooksLent(state, books){
  //TODO stop spinner
  return state.set('booksLent', books);
}

function startGettingBooksBorrowed(state){
  //TODO start spinner
  return state;
}

function finishGettingBooksBorrowed(state, books){
  //TODO stop spinner
  return state.set('booksBorrowed', books);
}

export default function(state = Map(), action){
  switch(action.type){
    case 'SET_STATE':
      return setState(state, action.state);
    case 'CLEAR_STATE':
      return clearState(state);
    case 'ADD_BOOK_TO_SHELF':
      return addBookToMyShelf(state, action.book);
    case 'SET_FOUND_BOOKS':
      return setFoundBooks(state, action.foundBooks);
    case 'REQUEST_BOOKS':
      return requestBooks(state, action.query);
    case 'RECEIVE_BOOKS':
      return receiveBooks(state, action.books);
    case 'START_GET_MY_BOOKS':
      return getMyBooks(state);
    case 'FINISH_GET_MY_BOOKS':
      return finishGetMyBooks(state, action.books);
   case 'START_BOOK_REQUEST':
      return startBookRequest(state);
    case 'FINISH_BOOK_REQUEST':
      return finishBookRequest(state);
    case 'START_GETTING_BOOK_REQUESTS_TO_USER':
      return startGettingBookRequestsToUser(state);
    case 'FINISH_GETTING_BOOK_REQUESTS_TO_USER':
      return finishGettingBookRequestsToUser(state, action.bookRequests);
    case 'START_GETTING_BOOKS_LENT':
      return startGettingBooksLent(state);
    case 'FINISH_GETTING_BOOKS_LENT':
      return finishGettingBooksLent(state, action.books);
    case 'START_GETTING_BOOKS_BORROWED':
      return startGettingBooksBorrowed(state);
    case 'FINISH_GETTING_BOOKS_BORROWED':
      return finishGettingBooksBorrowed(state, action.books);
    default:
      return setState(state);
  }
}


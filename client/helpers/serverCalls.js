import fetch from 'isomorphic-fetch'

var headers = {
  authorization: localStorage.token
}

export function asyncSignIn(usernameOrEmail, password, callback){
  $.ajax({
    url: '/api/signIn',
    method: 'POST',
    data: {usernameOrEmail: usernameOrEmail, password: password},
    success: callback,
    error: function(err){
      console.log('ERROR, USER NOT LOGGED IN');
      console.error(err);
    }
  });
}

export function getMyBooksAJAX(callback){
  $.ajax({
    url: '/api/books',
    method: 'GET',
    headers: {
      authorization: localStorage.token
    },
    success: callback,
    error: function(err){
      console.log('ERROR while fetching my books');
      console.error(err);
    }
  });
}

export function getMyFriendsAJAX(callback){
  $.ajax({
    url: '/api/friends/',
    method: 'GET',
    headers: {
      authorization: localStorage.token
    },
    success: callback,
    error: function(err){
      console.log('ERROR while fetching user\'s friends');
      console.error(err);
    }
  });
}

export function getMyFriendRequests(callback){
  $.ajax({
    url:'/api/friendRequests', 
    method: 'GET',
    headers: {
      authorization: localStorage.token
    },
    success: callback,
    error: function(err){
      console.log('ERROR while fetching user\'s friend Requests');
      console.error(err);
    }
  });
}

export function makeFriendRequestAsync(email, callback){
  $.ajax({
    url: '/api/friendRequests',
    method: 'POST',
    headers: {
      authorization: localStorage.token
    },
    data: {
      email: email 
    },
    success: function(res){
      console.log('makeFriendRequest Response: '); 
      console.log(res);
    },
    error: function(){
      console.log('makeFriendRequest Error: ');
    } 
  })
}

export function searchUsersAJAX(query, callback){
  $.ajax({
    url: '/api/findFriends/' + query,
    method: 'GET',
    headers: {
      authorization: localStorage.token
    },
    success: callback,
    error: function(err){
      console.log('ERROR FINDING USERS WITH QUERY', query);
      console.error(err);
    }
  });
}

export function regularSignUpAJAX(data, callback){
  if(data.invalidData === true){
    callback(null, 'Form data is not valid');
  } 
  $.ajax({
    url: '/api/signUp',
    method: 'POST',
    data: { username: data.username, password: data.password, email: data.email },
    success: callback,
    error: function(err){
      console.log('ERROR, USER NOT SIGNED UP')
      console.error(err);
    }
  });
}

export function acceptFriendRequestAJAX(friendRequestID, callback){
  $.ajax({
    url: '/api/acceptFriendRequest',
    method: 'POST',
    data: { id: friendRequestID },
    headers: {
      authorization: localStorage.token
    },
    success: callback,
    error: function(err){
      console.log('Error while accepting friendRequest');
      console.error(err);
    }
  });
}

export function createBookRequestAJAX(data, callback){
  console.log('creating book request with data:');
  console.log(data);
  $.ajax({
    url: '/api/bookRequest',
    method: 'POST',
    headers: {
      authorization: localStorage.token
    },
    data: {
      bookId: data.bookId,
      ownerId: data.ownerId
    },
    success: callback,
    error: function(error){
      console.error('serverCalls AJAX: Error while creating a book request');
      console.error(error);
    }
  });
}

export function getExploreBooksAJAX(callback){
  console.log('GETTING EXPLORE BOOKS');
  console.log('Token' + localStorage.token);
  console.log('Headers token' + headers.token);
  $.ajax({
    url: '/api/getAllBooksFromFriends',
    method: 'GET',
    headers: {
      authorization: localStorage.token
    },
    success: callback,
    error: function(error){
      console.error('serverCalls AJAX: Error while creating a book request');
      console.error(error);
    }
  });
}

export function getBookRequestsToUserAJAX(callback){
  console.log('BOOK REQUEST DONE TO ME');
  $.ajax({
    url: '/api/myRequestedBooks',
    method: 'GET',
    headers: {
      authorization: localStorage.token
    },
    success: callback,
    error: function(error){
      console.error('serverCalls AJAX: Error while fetching book requests done to user');
      console.error(error);
    }
  });
}

export function acceptBookRequestAJAX(requestId, callback){
  console.log('ACCEPTING REQUESTID: '+ requestId);
  $.ajax({
    url: '/api/acceptBookRequest',
    method: 'POST',
    headers: {
      authorization: localStorage.token
    },
    data: {
      id: requestId
    },
    success: callback,
    error: function(error){
      console.error('serverCalls AJAX: Error while accepting book request done to user');
      console.error(error);
    }
  });
}

export function getBooksLentAJAX(callback){
  $.ajax({
    url: '/api/lentBooks',
    method: 'GET',
    headers: {
      authorization: localStorage.token
    },
    success: callback,
    error: function(error){
      console.error('serverCalls AJAX: Error while fetching books lent');
      console.error(error);
    }
  });
}

export function getBooksBorrowedAJAX(callback){
  $.ajax({
    url: '/api/borrowedBooks',
    method: 'GET',
    headers: {
      authorization: localStorage.token
    },
    success: callback,
    error: function(error){
      console.error('serverCalls AJAX: Error while fetching books borrowed');
      console.error(error);
    }
  });
}


export function declineFriendRequestAJAX(friendRequestID, callback){
  $.ajax({
    url: '/api/deleteFriendRequest',
    method: 'POST',
    headers: {
      authorization: localStorage.token
    },
    data: {
      id: friendRequestID
    },
    success: callback,
    error: function(error){
      console.error('serverCalls AJAX: Error while declining friend Request borrowed');
      console.error(error);
    }
  }); 
}

export function getFriendBooksAJAX(friendId, callback){
  $.ajax({
    url: '/api/friends/'+ friendId +'/books',
    method: 'GET',
    headers: {
      authorization: localStorage.token
    },
    data: {
      id: friendId
    },
    success: callback,
    error: function(error){
      console.error('serverCalls AJAX: Error while getting friend ' + friendId + 'borrowed');
      console.error(error);
    }
  });  
}

export function addBookToMyShelfAJAX(book, callback){
  console.log('ADDING BOOK');
  console.log(book);
  $.ajax({
    url: '/api/books',
    method: 'POST',
    data: book,
    headers: {
      authorization: localStorage.token
    },
    success: callback,
    error: function(err){
      console.error('Error saving book');
      console.error(err);
    }
  });
}
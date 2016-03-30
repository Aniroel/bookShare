
## Reducer


## Actions - action_creators.js

These are our actions that are created by our action_creators.js

* **SET_STATE** - Sets
* **REGULAR_LOGIN** - Sends the login information to the Server and logs in if password and username is correct
* **REGULAR_SIGNUP** - Signs up the user with username/email and password
* **FACEBOOK_LOGIN** -
* **SET_USERNAME**
* **SET_EMAIL**
* **SET_PASSWORD**
* **SET_PASSWORD_CONFIRMATION**

## State

Our state uses the [immutable](https://facebook.github.io/immutable-js/) library and is composed of

_Map means the immutable Map Class_
_List means the immutable List Class_

* State (Map)
  * auth
    * username (String)
    * email (String)
    * password (String)
    * passwordConfirmation (String)
    * accessToken
    * displayValidationMessage
      * signIn
        * usernameOrEmail
        * password
      * signUp
        * username
        * email
        * password
        * passwordConfirmation
  * myLibrary
    * myBooks (List)
    * foundBooks (List)
    * loading
      * myBook (bool)
      * foundBooks (bool)
  * friends
    * myFriends (List)
    * foundUsers (List)
    * loading
      * myFriends (bool)
      * foundUsers (bool)
  * explore
    * myFriendsBooks

How Redux Works in this project

1. **actions** - Objects that have a 'type' and extra properties. The actions are sent to the reducer and it decides what to do with the action depending on it's 'type' property and the extra properties that are sent with it

2. **action_creators** - They are in charge of creating actions, they store the action 'type' that is used to identify which function is going to be executed by the reducer

3. **reducer** - The reducer holds the functionallity, it modifies the state (store)

4. **store** - The store is created with the creatStore redux method  and takes in a reducer as a parameter, the store is where all the information is 'stored'

### cURL Commands to test ISBNdb

function request(query){
  $.ajax({
    url: 'http://isbndb.com/api/v2/json/5MIPCZBD/books?q='+query,
    success: function(res){
      console.log(res);
    },
    error: function(err){
      console.error(err);
    }
  });
}


curl -X POST http://www.isbndb.com/api/books.xml  \
-d "access_key=5MIPCZBD&index1=title&value1=thief+of+time"


curl -X POST http://www.isbndb.com/api/books.xml  \
-d "access_key=5MIPCZBD&index1=name&value1=astronomy+teaching"


/api/subjects.xml?access_key=Z&index1=name&value1=astronomy+teaching


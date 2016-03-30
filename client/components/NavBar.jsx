import React from 'react';
import {Link, hashHistory} from 'react-router';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';


export const NavBar = class NavBar extends React.Component{
  logout(){
    {/*Fix logout*/}
    localStorage.clear();
    hashHistory.push('/signIn');
    this.props.clearState();
  }
  checkIfLoggedIn(){
    return !!localStorage.getItem('token');
  }
  render(){
    return <nav>
      {this.checkIfLoggedIn() ?
    <div>
    <ul>
      <span>Welcome {localStorage.displayName} </span>
      <li><Link to="/explore">Explore</Link></li>
      <li><Link to="/myLibrary">My Library</Link></li>
      <li><Link to="/friends">Friends</Link></li>
      
    </ul>
    <a className="logout" onClick={this.logout}>Logout</a> 
    </div>
    :
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
    </ul>
     }
  </nav>
  }
}

function mapStateToProps(state){
  return {
    displayName: state.auth.getIn(['userInfo', 'displayName'])
  }
}

export const NavBarContainer = connect(
  mapStateToProps,
  actionCreators
)(NavBar);
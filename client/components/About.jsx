import React from 'react';
import {NavBarContainer} from './NavBar';

class About extends React.Component{
  render(){
    return <div>
      <NavBarContainer/>
      <div className="hero about">
        <h2> Welcome to Book Share!</h2>
        <div className="description">
          Book Share allows users to connect through their love of reading by sharing their favorite books with friends.

          <h2> Spread the joy! </h2>
          Find new readers for your beloved books and explore your friend's book collections.
        </div>

        <h2>Who we are</h2>
        Click on our photos to learn more!
        <div className="people">
          <div>
            <a href="https://github.com/carlosyasu91">
              <img src="./assets/babyOwl.jpg" />
              <p> Yasu Flores</p>
            </a>
          </div>

          <div>
            <a href="https://github.com/Aniroel">
              <img src="./assets/redPanda.jpg" />
            </a>
              <p>Leorina Baybay</p>
          </div>

          <div>
              <a href="https://github.com/jblza">
              <img src="./assets/kittenGlasses.jpg" />
            </a>
              <p>Jonathan Blaising</p>
          </div>
        </div>
      </div>
    </div>
  }
}

export default About;



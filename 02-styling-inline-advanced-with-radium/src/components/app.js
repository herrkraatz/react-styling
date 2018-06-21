import React, { Component } from 'react';
import UserList from './user_list';
import Radium, { StyleRoot } from 'radium';

class App extends Component {
  render() {
    return (
        <div>
            <StyleRoot>
                <UserList/>
            </StyleRoot>
        </div>
    );
  }
}

export default Radium(App);

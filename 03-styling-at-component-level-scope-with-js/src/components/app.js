import React, { Component } from 'react';
import UserList from './user_list';

import styled from 'styled-components';

// Create a <Title> react component that renders an <h1> which is
// centered, palevioletred and sized at 1.5em
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a <Wrapper> react component that renders a <section> with
// some padding and a papayawhip background
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

export default class App extends Component {
  render() {
    return (
      <div>
        <Wrapper>
          <Title>Hello World, this is my first styled component!</Title>
        </Wrapper>
        <UserList />
      </div>
    );
  }
}

import React from 'react';
import Form from './Form';
import Nav from './Nav';

const Header = props => {
  return (
    <div>
      <img src={require('./logo3.png')} alt=""/>
      <Form onSearch={props.onSearch} />
      <Nav />
    </div>
  );
}

export default Header;
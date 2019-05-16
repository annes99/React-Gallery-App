import React from 'react';
import Form from './Form';
import Nav from './Nav';

const Header = props => {
  return (
    <div>
      {/* adding logo in the header */}
      <img src={require('./logo3.png')} alt="website logo"/>
      <Form onSearch={props.onSearch} />
      <Nav />
    </div>
  );
}

export default Header;
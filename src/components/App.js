import React from 'react';
import apiKey from '../config'
import Header from './Header'
import Nav from './Nav'
import Gallery from './Gallery'


const App = () => {
  return (

    <div className="container">
      <Header />
      <Nav />
      <Gallery />
    </div>
    

  );
}

export default App;

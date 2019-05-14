import React from 'react';
import { NavLink } from 'react-router-dom';


const Nav = props => {

  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink to='/sunrise'>Sunrise</NavLink></li>
        <li><NavLink to='/waterfall'>Waterfall</NavLink></li>
        <li><NavLink to='/rainbow'>Rainbow</NavLink></li>
        <li><NavLink to='/sunset'>Sunset</NavLink></li>
      </ul>
    </nav>
  );
}

export default Nav;
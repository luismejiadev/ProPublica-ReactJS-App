import React from 'react';
import { Link } from 'react-router-dom'


import './Header.css';
import logo from '../../../assets/images/logo.png';

const header = (props) => {
    return (
      <header className="App-header">
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Programming Exercise</h1>
        </Link>
      </header>
    );
}

export default header;
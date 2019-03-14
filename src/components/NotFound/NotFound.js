import React from 'react'

import './NotFound.css'
import { Link } from 'react-router-dom';

const notFound = (props) => (
  <div className="notFound">
    <h1>404 - Page not found</h1>
    <Link to={"/"}>Home</Link>
  </div>
);

export default notFound
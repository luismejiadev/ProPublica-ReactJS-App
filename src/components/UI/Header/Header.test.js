import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Header from './Header';

it('renders without crashing', () => {
  const element = document.createElement('header');
  ReactDOM.render(
  <BrowserRouter>
    <Header />
  </BrowserRouter>, element);
  ReactDOM.unmountComponentAtNode(element);
});

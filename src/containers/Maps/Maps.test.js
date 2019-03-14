import React from 'react';
import ReactDOM from 'react-dom';
import Maps from './Maps';
import { BrowserRouter } from 'react-router-dom';


it('renders without crashing', () => {
  const element = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <Maps />
  </BrowserRouter>,
  element);
  ReactDOM.unmountComponentAtNode(element);
});

import React from 'react';
import ReactDOM from 'react-dom';
import NotFound from './NotFound';
import { BrowserRouter } from 'react-router-dom';


it('renders without crashing', () => {
  const element = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <NotFound />
  </BrowserRouter>,
  element);
  ReactDOM.unmountComponentAtNode(element);
});

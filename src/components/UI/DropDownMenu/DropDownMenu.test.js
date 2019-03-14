import React from 'react';
import ReactDOM from 'react-dom';
import DropDownMenu from './DropDownMenu';
import { BrowserRouter } from 'react-router-dom';


it('renders without crashing', () => {
  const element = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <DropDownMenu />
  </BrowserRouter>,
  element);
  ReactDOM.unmountComponentAtNode(element);
});

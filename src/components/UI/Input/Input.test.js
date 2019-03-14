import React from 'react';
import ReactDOM from 'react-dom';

import Input from './Input';

it('renders without crashing', () => {
  const element = document.createElement('input');
  ReactDOM.render(
    <Input />, element);
  ReactDOM.unmountComponentAtNode(element);
});

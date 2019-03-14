import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from './Spinner';

it('renders without crashing', () => {
  const element = document.createElement('div');
  ReactDOM.render(<Spinner />, element);
  ReactDOM.unmountComponentAtNode(element);
});

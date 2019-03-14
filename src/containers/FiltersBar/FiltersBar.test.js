import React from 'react';
import ReactDOM from 'react-dom';

import FiltersBar from './FiltersBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const location = {
    search:''
  }
  ReactDOM.render(
    <FiltersBar location={location}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

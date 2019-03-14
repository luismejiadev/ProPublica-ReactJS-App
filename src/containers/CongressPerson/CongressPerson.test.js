import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import CongressPerson from './CongressPerson';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
    <CongressPerson  />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

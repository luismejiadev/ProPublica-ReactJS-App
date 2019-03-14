import React from 'react';
import ReactDOM from 'react-dom';

import CongressPersonDetail from './CongressPersonDetail';
import { BrowserRouter } from 'react-router-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
    <CongressPersonDetail  />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

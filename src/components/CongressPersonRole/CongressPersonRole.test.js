import React from 'react';
import ReactDOM from 'react-dom';
import CongressPersonRole from './CongressPersonRole';

it('renders without crashing', () => {
  const element = document.createElement('li');
  ReactDOM.render(<CongressPersonRole />, element);
  ReactDOM.unmountComponentAtNode(element);
});

it('renders without crashing', () => {
  const element = document.createElement('li');
  const data = {
    title: "title"
  }
  ReactDOM.render(<CongressPersonRole data={data}/>, element);
  ReactDOM.unmountComponentAtNode(element);
});
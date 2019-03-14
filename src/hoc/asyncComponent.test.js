import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import asyncComponent from './asyncComponent';

it(' should render a Component class that will load async', () => {
  const MyComponent =  asyncComponent(() => import('../components/NotFound/NotFound'))
  expect(new MyComponent).toBeInstanceOf(Component);
});

it(' should render', () => {
  const div = document.createElement('div');
  const MyComponent =  asyncComponent(() => import('../components/UI/Button/Button'))
  ReactDOM.render(<MyComponent />, div);
});

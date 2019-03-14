import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme';
import '../../testConfig'; // Setup Enzyme & Adapter

import Members from './fixtures.js';
import { BrowserRouter } from 'react-router-dom';

import configureMockStore from 'redux-mock-store';

import App from './App';

describe('App', () => {
    let wrapper, store;
    // fetch is not supported in node, which is the context in which these jest tests are run
    // this means that the external API calls won't work. That's OK though, we probably don't
    // want to rely on real API calls for our tests, so we can use this to stub out a dummy response.

    // keep in mind you will need to edit this mock response with the appropriate mock API data
    // so that your components recieve the data they expect.
    beforeAll(function() {
      global.fetch = jest.fn().mockImplementation((url, options) => {
          return new Promise((resolve, reject) => {
            resolve({
              ok: true,
              Id: '123',
              json: function() {
                return Members.results[0].members // YOUR MOCK RESPONSE HERE
              }
            });
          });
      });
    });

    beforeEach(() => {
        const initialState =  {
          congressSession: 115,
          congressChamber: 'senate'
        };
        const mockStore = configureMockStore();
        const store = mockStore(initialState);
        // Shallow render the container passing in the mock store
        wrapper = shallow(
            <App store={store} />
        );
    });

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<wrapper />, div);
      ReactDOM.unmountComponentAtNode(div);
    });
});
import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme';
import '../../testConfig'; // Setup Enzyme & Adapter

import { BrowserRouter } from 'react-router-dom';

import configureMockStore from 'redux-mock-store';

import NavBar from './NavBar';

describe('NavBar', () => {
    let wrapper, store;

    beforeEach(() => {
        const initialState =  {
          congressSession: 115,
          congressChamber: 'senate'
        };
        const mockStore = configureMockStore();
        const store = mockStore(initialState);
        // Shallow render the container passing in the mock store
        wrapper = shallow(
            <BrowserRouter>
            <NavBar store={store} />
            </BrowserRouter>
        );
    });

    it('should show initial state when location empty ', () => {
        expect(wrapper.props().history.location.search).toEqual("");
    });

});
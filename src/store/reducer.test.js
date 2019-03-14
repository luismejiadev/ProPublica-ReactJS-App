import reducer from './reducer';

import Settings from '../settings/settings';
import Actions from './actions/actions';

describe('camber reducer', () => {
  it('should return the initial state', () => {
    const startAction = {
      type: 'any' // not managed by reducer
    };
    const initialState = {
      congressSession: Settings.DEFAULT_CONGRESS_SESSION,
      congressChamber: Settings.DEFAULT_CONGRESS_CHAMBER,
      query: '',
      loading: false
    }
    expect(reducer(undefined, startAction)).toEqual(initialState);
  });

  it('should return same state wihtout modification', () => {
    expect(reducer({}, {type: 'any'})).toEqual({});
  });

  it('should handle SESSION_CHANGED', () => {
    const startAction = {
      type: Actions.SESSION_CHANGED,
      payload: {value: 100}
    };

    const expected = {
      congressSession: 100,
      congressChamber: Settings.DEFAULT_CONGRESS_CHAMBER,
      query: '',
      loading: false
    }
    expect(reducer(undefined, startAction)).toEqual(expected);
  });

  it('should handle CHAMBER_CHANGED', () => {
    const startAction = {
      type: Actions.CHAMBER_CHANGED,
      payload: {value: 'house'}
    };
    const expected = {
      congressSession: Settings.DEFAULT_CONGRESS_SESSION,
      congressChamber: 'house',
      query: '',
      loading: false
    }
    expect(reducer(undefined, startAction)).toEqual(expected);
  });

});
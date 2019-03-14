import Actions from './actions';

it('should be instance of class ', () => {
  expect(new Actions).toBeInstanceOf(Actions);
});


it('should return SESSION_CHANGED', () => {
  expect(Actions.SESSION_CHANGED).toEqual('SESSION_CHANGED');
});

it('should return CHAMBER_CHANGEDs', () => {
  expect(Actions.CHAMBER_CHANGED).toEqual('CHAMBER_CHANGED');
});

it('should validate static SESSION_CHANGED', () => {
  expect(new Actions).toEqual({});
});

it('should validate static CHAMBER_CHANGEDs', () => {
  expect(new Actions).toEqual({});
});

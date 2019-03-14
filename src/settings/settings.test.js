import Settings from './settings';

describe('testing getApiUrl', () => {
  it('should return ApiUrl for senate-115 v1', () => {
    expect(Settings.getApiUrl(115, 'senate', 'v1')).toEqual('https://api.propublica.org/congress/v1/115/senate/members.json');
  });

  it('should return ApiUrl for house 90 v2', () => {
    expect(Settings.getApiUrl(90, 'house', 'v2')).toEqual('https://api.propublica.org/congress/v2/90/house/members.json');
  });

});

describe('testing getCacheKey', () => {

  it('should return a range of numbers', () => {
    expect(Settings.getCacheKey(115, 'senate', 'v1')).toEqual('Members:v1:115:senate');
  });

  it('should return a range of numbers', () => {
    expect(Settings.getCacheKey(90, 'house', 'v2')).toEqual('Members:v2:90:house');
  });

});
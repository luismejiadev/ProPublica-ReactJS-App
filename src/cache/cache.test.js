import Cache from './cache';
class localStorageMock {
  cache = {}
  getItem = (key) => (this.cache[key])
  setItem = (key, value) => (this.cache[key] = value)
  clear = () => (this.cache = {})
  removeItem = (key) => (delete this.cache[key])
}

global.localStorage = new localStorageMock;

function delay(t, v) {
   return new Promise(function(resolve) {
       setTimeout(resolve.bind(null, v), t)
   });
}


describe('testing set an get for cache', () => {
  it('should set expiration date', () => {
    const now = new Date().getTime();
    let data;
    let saved_data;

    Cache.set("test", 10, 10);
    data = localStorage.getItem("test");
    data = JSON.parse(data);
    expect(data.expiration).toBeGreaterThan(now);
    saved_data = Cache.get("test");
    expect(saved_data).toEqual(10);
  });

  it('set data, validate when user deleted data', () => {
    const now = new Date().getTime();
    let data;
    let saved_data;

    Cache.set("test", 10, 10);
    localStorage.removeItem("test");
    saved_data = Cache.get("test");
    expect(saved_data).toEqual(null);
  });

  it('should set expiration date and wait to expiration', () => {
    let data;
    let saved_data;

    expect.assertions(2);

    Cache.set("test", 10, 1);
    return delay(2000).then(data => {
      const now = new Date().getTime();

      data = localStorage.getItem("test");
      data = JSON.parse(data);
      expect(now).toBeGreaterThan(data.expiration);
      saved_data = Cache.get("test");
      expect(saved_data).toEqual(null);
    });

  });



});
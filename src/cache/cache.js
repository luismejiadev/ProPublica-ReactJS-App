import logger from '../middleware/logger';

export default class Cache {
  static get = (key, value) => {
    const now = new Date().getTime();
    let data = localStorage.getItem(key);
    try {
      if (data !== undefined) {
        data = JSON.parse(data);
        if (data.expiration <= now) {
          logger.log("deleting cache");
          localStorage.removeItem(key);
        } else {
          logger.log("getting cache " + key);
          return data.data;
        }
      }
    } catch (error) {};
    return null;
  };

  static set = (key, value, ttl) => {
    const expiration = new Date().getTime() + (ttl*1000);
    const wrapped_data = { data: value, expiration: expiration };
    const cached_data = JSON.stringify(wrapped_data);
    localStorage.setItem(key, cached_data);
    logger.log("setting cache:", key);
  };

}
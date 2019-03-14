export default class Utils {

  static range = (start, stop, step=1, includeLast=true) => {
      if (stop === undefined) {
          stop = start;
          start = 0;
      }
      if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
          return [];
      }
      let result = [];
      for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
          result.push(i);
      }
      if (includeLast) result.push(stop);
      return result;
  };

  static cleanValue = (value, fn, defaultValue) => {
    let result = null;
    try{
      result = fn(value) || defaultValue;
    } catch (error){
      result = defaultValue;
    };
    return result
  };

  static cleanQueryString = (queryString) => {
    if (queryString === "") return {};
    const Settings = require('../settings/settings').default;

    const logger = require('../middleware/logger').default;
    logger.log(queryString);

    queryString = new URLSearchParams(queryString);

    const congressChamber = Utils.cleanValue(
      queryString.get("congressChamber"), // value
      (value)=> ((Settings.CONGRESS_CHAMBERS.includes(value))? value: null), // cleaner function
      Settings.DEFAULT_CONGRESS_CHAMBER  // default falue if cleaner fails
    );

    const congressSession = Utils.cleanValue(
      queryString.get("congressSession"),
      (value)=> ((Settings.CONGRESS_SESSIONS[congressChamber].includes(parseInt(value, 10)))? value: null) ,
      Settings.DEFAULT_CONGRESS_SESSION
    );

    return {
      congressChamber: congressChamber,
      congressSession: congressSession,
      query: queryString.get("query")
    }
  }

  static getImageProfile = (username, profileType) => {
    const defaultImage = require('../assets/images/user-icon-white.svg');

    if (username === null) return defaultImage;

    switch (profileType) {
      case 'facebook':
        return "https://graph.facebook.com/" + username + "/picture";

      default:
        return defaultImage;
    }
  }
}
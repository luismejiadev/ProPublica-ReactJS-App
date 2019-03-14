import Utils from '../utils/utils';

export default class Settings {
  static DEBUG: boolean = true;  // set logging level

  static CONGRESS_CHAMBERS = ['house', 'senate'];
  static CONGRESS_SESSIONS = {
    'house': Utils.range(102, 115),
    'senate': Utils.range(80, 115)
  }
  static DEFAULT_CONGRESS_SESSION: number = 115;    // 115th congressional session, 102-115 for House, 80-115 for Senate
  static DEFAULT_CONGRESS_CHAMBER: string = 'senate'; // senate or 'house'

  static CACHE_TTL: number = 60*60; // 1h

  static API_KEY: string = 'YOUR PRO PUBLICA API KEY';
  static MAPS_API_KEY: string = 'YOUR GOOGLE MAPS API KEY';
  static PER_PAGE: number = 12;  // used as default in pagination


  static getApiUrl = (session, chamber, version='v1') =>  `https://api.propublica.org/congress/${version}/${session}/${chamber}/members.json`
  static getCacheKey = (session, chamber, version='v1') => `Members:${version}:${session}:${chamber}`
}


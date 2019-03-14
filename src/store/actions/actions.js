export default class Actions {
  // ACTION TYPES
  static SESSION_CHANGED: string = 'SESSION_CHANGED';
  static CHAMBER_CHANGED: string = 'CHAMBER_CHANGED';
  static QUERY_CHANGED: string = 'QUERY_CHANGED';
  static LOADING_CHANGED: string = 'LOADING_CHANGED';
  static LOCATION_CHANGED: string = 'LOCATION_CHANGED';

  // ACTION CREATORS
  static sessionChanged = (payload) => {
    return {
      ...payload,
      type: this.SESSION_CHANGED
    }
  };
  static chamberChanged = (payload) => {
    return {
      ...payload,
      type: this.CHAMBER_CHANGED
    }
  };
  static queryChanged = (payload) => {
    return {
      ...payload,
      type: this.QUERY_CHANGED
    }
  };
}
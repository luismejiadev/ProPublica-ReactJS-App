import Settings from '../settings/settings';
import Actions from './actions/actions';

const initialState = {
  congressSession: Settings.DEFAULT_CONGRESS_SESSION,
  congressChamber: Settings.DEFAULT_CONGRESS_CHAMBER,
  query: '',
  loading: false

}
const reducer = (state = initialState, action) => {
  switch (action.type){
    case (Actions.SESSION_CHANGED):
      return {
        ...state,
        congressSession: action.payload.value
      }
    case (Actions.CHAMBER_CHANGED):
      return {
        ...state,
        congressChamber: action.payload.value
      }
    case (Actions.QUERY_CHANGED):
      return {
        ...state,
        query: action.payload.value
      }
    case (Actions.LOADING_CHANGED):
      return {
        ...state,
        loading: action.payload.value
      }
    case (Actions.LOCATION_CHANGED):
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}

export default reducer;
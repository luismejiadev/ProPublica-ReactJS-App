import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

import './NavBar.css';
import renderContent from './NavBar.jsx';

import Input from '../../components/UI/Input/Input';
import DropDownMenu from '../../components/UI/DropDownMenu/DropDownMenu';
import Utils from '../../utils/utils';

import logo from '../../assets/images/logo.png';
import logger from '../../middleware/logger';
import Actions from '../../store/actions/actions';
import Settings from '../../settings/settings';


class NavBar extends Component {
  state = {
    query: '',
    congressChamber: null,
    congressSession: null,
    results: [],
    loading: false,
    chamberMenuOpen: false,
    sessionMenuOpen: false,
    menuOpen: false,
    formElement: {
      label: '',
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Search'
      }
    }
  }

  componentWillUpdate(nextProps, nextState){
    logger.log("[componentWillUpdate NavBar.js]");

  }

  componentDidUpdate(prevProps, prevState) {
    logger.log("[componentDidUpdate NavBar.js]");
  }

  componentDidMount() {
    logger.log("[componentDidMount NavBar.js]");
    const queryString = Utils.cleanQueryString(this.props.location.search);
    logger.log(queryString);

    if (Object.keys(queryString).length > 0){
      this.props.onLocationChanged(queryString)
    }

  }

  menuClickHandler = (event) => {
    console.log("menu clicked");
    event.preventDefault();
    this.setState({menuOpen: !this.state.menuOpen});
  }

  inputChangedHandler = (event, inputIdentifier) => {
    this.props.onLoadingChanged({value: true});

    // console.log(event);
    const inputValue = event.target.value;
    // const newState = {}
    // newState[inputIdentifier] = inputValue;
    // this.setState(newState);

    const queryString = new URLSearchParams(this.props.location.search);
    if (inputValue === ""){
      queryString.delete(inputIdentifier);
    } else {
      queryString.set(inputIdentifier, inputValue);
    }
    queryString.delete("page");  // reset currentPage

    // here we force to re-render by changing location search

    const newLocation = {...this.props.location, search: queryString.toString()}
    if (this.props.location.pathname !== "/congresspeople"){
      logger.log("changing location");
      newLocation.pathname = "/congresspeople";
      this.props.history.push(newLocation);
    } else{
      this.props.history.replace(newLocation);
    }

    switch (inputIdentifier){
      case ("query"):
        this.props.onQueryChanged({value:inputValue});
        break;
      case ("congressChamber"):
        this.props.onChamberChanged({value:inputValue});
        break;
      case ("congressSession"):
        this.props.onSessionChanged({value:inputValue});
        break;
      default:
        //
    }
  }

  formSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    logger.log(this.props.query);
    this.setState({loading: false});
  }

  render = () => {
    console.log(this.state.congressSession);
    const content = {
      menuClickHandler: this.menuClickHandler,
      searchInput: (
        <Input
          className="form-control mr-sm-2 SearchInput"
          elementType="search"
          elementConfig={{placeholder: "Search"}}
          noWrapper={true}
          value={this.props.query || ''}
          changed={(event) => this.inputChangedHandler(event, "query")}
        />
      ),
      logo: logo,
      chamberMenu: (
        <DropDownMenu
          title="Chamber"
          menuOpen={this.state.chamberMenuOpen}
          value={((this.props.congressChamber)? this.props.congressChamber : Settings.DEFAULT_CONGRESS_CHAMBER)}
          options={['house', 'senate']}
          clicked={(event) => this.inputChangedHandler(event, "congressChamber")}
        />),
      sessionMenu: (
        <DropDownMenu
          title="Session"
          menuOpen={this.state.chamberMenuOpen}
          value={((this.props.congressSession)? this.props.congressSession : Settings.DEFAULT_CONGRESS_SESSION)}
          options={Settings.CONGRESS_SESSIONS[this.props.congressChamber]}
          clicked={(event) => this.inputChangedHandler(event, "congressSession")}
        />),
      menuOpen: this.state.menuOpen
    }

    return renderContent(content);
  }

}

const mapStateToProps = state => {
  return {
    congressSession: state.congressSession,
    congressChamber: state.congressChamber,
    query: state.query
  };
};

const mapDispatchToProps = (dispatch) =>{
  return {
    onSessionChanged: (payload) => dispatch({type:Actions.SESSION_CHANGED, payload}),
    onChamberChanged: (payload) => dispatch({type:Actions.CHAMBER_CHANGED, payload}), //Actions.chamberChanged(payload)),
    onQueryChanged: (payload) => dispatch({type:Actions.QUERY_CHANGED, payload}),
    onLoadingChanged: (payload) => dispatch({type:Actions.LOADING_CHANGED, payload}),
    onLocationChanged: (payload) => dispatch({type:Actions.LOCATION_CHANGED, payload})
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));

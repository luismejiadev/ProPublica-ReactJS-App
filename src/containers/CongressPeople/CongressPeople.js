import React, { Component } from 'react';
import {connect } from 'react-redux';

import './CongressPeople.css';
import renderContent from './CongressPeople.jsx';


import Settings from '../../settings/settings';
import StateCodes from '../../settings/stateCodes';
import Actions from '../../store/actions/actions';
import Utils from '../../utils/utils';
import Cache from '../../cache/cache';
import Members from '../App/fixtures';


import CongressPerson from '../CongressPerson/CongressPerson';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';

import Pagination from '../Pagination/Pagination';

import FiltersBar from '../FiltersBar/FiltersBar';

import logger from '../../middleware/logger';


class CongressPeople extends Component {
  state = {
    members: [],
    results: [],
    loading: false,
    show: false,
    showFilters: true,
    years: [],
    currentPage: 1,
    congressSession: Settings.DEFAULT_CONGRESS_SESSION,
    congressChamber: Settings.DEFAULT_CONGRESS_CHAMBER,
    pageLimit: Settings.PER_PAGE
  }

  toogleFilters = () => {
    this.setState({showFilters: !this.state.showFilters});
  };

  componentWillUpdate(nextProps, nextState){
    logger.log("[componentWillUpdate CongressPeople.js]");
    // const queryString = new URLSearchParams(this.props.location.search);
    // this.updateContent(queryString);
  }

  componentDidMount() {
    logger.log("[componentDidMount CongressPeople.js]");
    if (this.props.location){
      const queryString = Utils.cleanQueryString(this.props.location.search);
      const newState = {
        congressSession: queryString.congressSession || Settings.DEFAULT_CONGRESS_SESSION,
        congressChamber: queryString.congressChamber || Settings.DEFAULT_CONGRESS_CHAMBER,
        loading: true
      }
      this.setState(newState);
    } else {
      // this.fetchMembersData();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    logger.log("[componentDidUpdate CongressPeople.js]");
    const sessionChanged = (prevProps.congressSession !== this.props.congressSession)
    const chamberChanged = (prevProps.congressChamber !== this.props.congressChamber)
    logger.log("sessionChanged "+ sessionChanged)
    logger.log("chamberChanged "+ chamberChanged)

    if (prevState.loading !== this.state.loading ){
      // notify the whole app that loading changed
      this.props.onLoadingChanged({value:this.state.loading});
    } else if (this.state.loading !== this.props.loading ){
      this.props.onLoadingChanged({value:this.state.loading});
    }

    if (sessionChanged || chamberChanged || this.state.loading) {
      logger.log("fetching data")
      this.fetchMembersData();
    }

  }

  fetchMembersDataFromFixtures  = () => {
    const url = Settings.getApiUrl(this.props.congressSession,this.props.congressChamber);
    logger.log(url);

       const members = Members.results[0].members//local fixtures
      logger.log(members);
      let years = [];
      let results = [];
      let cacheKey;

      results = members.map(member => {
        let values = {...member}
        let names = [];
        if (member.middle_name) {
          names = [member.first_name, member.middle_name, member.last_name]
        } else {
          names = [member.first_name, member.last_name]
        }
        values['full_name']= names.join(" ");
        logger.log(member.state);
        logger.log(StateCodes[member.state]);
        values['stateName'] = StateCodes[member.state] || member.state;

        if (member.next_election && !years.includes(member.next_election)){
          years.push(member.next_election);
        }
        return values; // return of map function
      })
      years.sort()

      this.setState({members: results, years: years, loading: false});

      cacheKey = Settings.getCacheKey(this.props.congressSession,this.props.congressChamber);
      Cache.set(cacheKey, {members: results, years: years}, Settings.CACHE_TTL);

  }

  fetchMembersDataFromApi = () => {
    logger.log(this.props);
    const url = Settings.getApiUrl(this.props.congressSession, this.props.congressChamber);
    logger.log(url);
    fetch(url, {headers: new Headers({'X-API-Key': Settings.API_KEY,}),})
    .then((res) => res.json())
    .then((json) => json.results[0].members)
    .then((members) => {
      logger.log(members);
      let years = [];
      let results = [];
      let cacheKey;

      results = members.map(member => {
        let values = {...member}
        let names = [];
        if (member.middle_name) {
          names = [member.first_name, member.middle_name, member.last_name]
        } else {
          names = [member.first_name, member.last_name]
        }
        values['full_name']= names.join(" ");
        values['stateName'] = StateCodes[member.state] || member.state;
        if (member.next_election && !years.includes(member.next_election)){
          years.push(member.next_election);
        }
        return values; // return of map function
      })
      years.sort()

      this.setState({members: results, loading: false, years: years});

      cacheKey = Settings.getCacheKey(this.props.congressSession,this.props.congressChamber);
      Cache.set(cacheKey, {members: results, years: years}, Settings.CACHE_TTL);
    })
    .catch(error => {
      logger.log(error);
      this.setState({loading: false});

    })

  }

  fetchMembersData = () => {
    let data = Cache.get(
      Settings.getCacheKey(this.props.congressSession, this.props.congressChamber) // cache key
    )
    if (data) {
      this.setState({members: data.members, years: data.years, loading: false});
    } else {
      // this.fetchMembersDataFromFixtures();
      this.fetchMembersDataFromApi()
    };
    return data;
  }

  getData = () => {
    const queryString = new URLSearchParams(this.props.location.search);
    let filters = {
      query: (obj, value) => obj.full_name.toLowerCase().includes(value.toLowerCase()),
      party: (obj, value) => obj.party === value,
      gender: (obj, value) => obj.gender === value,
      nextElection: (obj, value) => obj.next_election === value,
      totalVotes: (obj, value) => obj.total_votes > value,
      voteWithParty: (obj, value) => obj.votes_with_party_pct > value,
      missingVotes: (obj, value) => obj.missed_votes_pct > value
    };

    const applyFilter = (member) => {
      let result = true;
      for(let [k, v] of queryString.entries()) {
        if (filters[k]){  // skip invalid filters
          result = result && filters[k](member, v);
        }
      }
      return result
    }

    const currentPage = Utils.cleanValue(queryString.get("page"), parseInt,  1);
    const pageLimit = Utils.cleanValue(queryString.get("pageLimit"), parseInt, Settings.PER_PAGE);

    const results = this.state.members.filter(applyFilter);
    const offset = ( currentPage - 1) * pageLimit;
    return {
      searchedData: results,
      pageData: results.slice(offset, offset + pageLimit),
      currentPage: currentPage,
      pageLimit: pageLimit
    }
  }

  getInfo = (inputIdentifier, inputValue) => {
    if (inputIdentifier === 'congressChamber' || inputIdentifier === 'congressSession') {
      let newState = {}
      newState[inputIdentifier] = inputValue
      // update congressChamber or congressSession state
      this.setState(newState);
    }
      let new_query = {}
      new_query[inputIdentifier] = inputValue
      const queryString = new URLSearchParams(this.props.location.search);
      if (inputValue === ""){
        queryString.delete(inputIdentifier);
      } else {
        queryString.set(inputIdentifier, inputValue);
      }
      queryString.delete("page");  // reset currentPage

      // here we force to re-render by changing location search
      this.props.history.replace({...this.props.location, search: queryString.toString()})

  }

  inputChangedHandler = (event, inputIdentifier) => {
    let newState = {};
    const currentValue = event.target.value
    newState[inputIdentifier] = currentValue;
    this.setState(
      newState,
      () => this.getInfo(inputIdentifier, currentValue)
    );
  }

  render() {
    console.log("[render CongressPeople.js]");
    logger.log(this.props);

    let content = {};

    const data = this.getData()
    const totalRecords = data.searchedData.length;
    logger.log(totalRecords);

    console.log(this.state.years);
    console.log(data.searchedData);
    if (this.state.years.length == 0){
      let years = [];
      for (let member in data.searchedData){
        if (member.next_election && !years.includes(member.next_election)){
          years.push(member.next_election);
        }
        years.sort();
      }
      console.log(years);
    }

    let rows = data.pageData.map((member) => (
      <CongressPerson key={member.id}  data={member} address={member.office}/>
    ))

    const key = 'pageLimit';
    const formElement =  {
      label: 'Show ',
      elementType: 'select',
      elementConfig: {
        options: [10, 25, 50, 100].map(i=>({value: i, displayValue: i}))
      },
      value: this.state.pageLimit
    };
    logger.log("internal loading " +this.state.loading);
    logger.log("external loading " +this.props.loading);
    if (this.props.loading) {
      content = {rows: <Spinner />};
    } else {
      content = {
        toogleFilters: this.toogleFilters,
        showFilters: this.state.showFilters,
        pageLimit: (
          <Input
            key={key}
            label={formElement.label}
            elementType={formElement.elementType}
            elementConfig={formElement.elementConfig}
            value={formElement.value}
            className="PageLimit"
            labelAfterInput={' entries. ' + totalRecords + " in total."}
            changed={(event) => this.inputChangedHandler(event, key)} />
        ),
        rows: rows,
        pagination: (
          <Pagination totalRecords={totalRecords} currentPage={data.currentPage} pageLimit={data.pageLimit} />
        )
      }
    }
    console.log(this.state.years);
    content.filters = (
      <FiltersBar years={this.state.years} location={this.props.location} getInfo={(inputIdentifier, query) => this.getInfo(inputIdentifier, query)}/>
    )
    return renderContent(content);
  }
}

const mapStateToProps = state => {
  return {
    congressSession: state.congressSession,
    congressChamber: state.congressChamber,
    query: state.query,
    loading: state.loading
  };
};

const mapDispatchToProps = (dispatch) =>{
  return {
    onLoadingChanged: (payload) => dispatch({type:Actions.LOADING_CHANGED, payload})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CongressPeople);

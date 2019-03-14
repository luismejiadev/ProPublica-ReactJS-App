import React, { Component } from 'react';
import './FiltersBar.css';
import renderContent from './FiltersBar.jsx';

import Input from '../../components/UI/Input/Input';
import logger from '../../middleware/logger';


class FiltersBar extends Component {
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...this.state.filtersForm
    }
    const updatedFormElement = {
      ...updatedForm[inputIdentifier]
    }
    const currentValue = event.target.value
    updatedFormElement.value = currentValue;
    updatedForm[inputIdentifier] = updatedFormElement;
    this.setState(
      {filtersForm: updatedForm},
      () => this.props.getInfo(inputIdentifier, currentValue)
    );
  }

  state = {
    loading: false,
    filtersForm: {
      party: {
        label: 'Party',
        elementType: 'select',
        elementConfig: {
          options: [
            {value: '', displayValue: 'All Parties'},
            {value: 'D', displayValue: 'Democratic'},
            {value: 'R', displayValue: 'Republican'}
          ]
        },
        value: '',
        placeHolder: 'All parties',
        inputChangedHandler: this.inputChangedHandler
      },
      nextElection: {
        label: 'Year of next election',
        elementType: 'select',
        elementConfig: {
          options: []
        },
        years: [],
        value: '',
        placeHolder: 'All Years',
        inputChangedHandler: this.inputChangedHandler
      },
      gender: {
        label: 'Gender',
        elementType: 'select',
        elementConfig: {
          options: [
            {value: '', displayValue: 'All Gender'},
            {value: 'F', displayValue: 'Female'},
            {value: 'M', displayValue: 'Male'}
          ]
        },
        value: '',
        placeHolder: 'All Genders',
        inputChangedHandler: this.inputChangedHandler
      },
      totalVotes: {
        label: 'Total  Votes',
        elementType: 'range',
        value: 0,
        inputChangedHandler: this.inputChangedHandler
      },
      voteWithParty: {
        label: '% Votes with Party',
        elementType: 'range',
        value: 0,
        inputChangedHandler: this.inputChangedHandler
      },
      missingVotes: {
        label: '% Missing votes',
        elementType: 'range',
        value: 0,
        inputChangedHandler: this.inputChangedHandler
      },
    }
  }

  componentDidMount() {
    let updatedFormElement;
    let changed = false;
    const updatedForm = {
      ...this.state.filtersForm
    }
    if (this.props.location && this.props.location.search){
      const queryString = new URLSearchParams(this.props.location.search);
      for(let [k, v] of queryString.entries()) {
        if (updatedForm[k]){
          updatedFormElement = {
            ...updatedForm[k]
          }
          updatedFormElement.value = v;
          updatedForm[k] = updatedFormElement;
          changed=true;
        }
      }
    }
    this.updateYears();
    if (changed){
      this.setState({filtersForm: updatedForm});
    }
  }

  componentDidUpdate(prevProps, prevState){
    logger.log(this.props.years);
    if (this.props.years !== this.state.filtersForm.nextElection.years){
      this.updateYears();
    }
  }

  updateYears =()=> {
      const updatedForm = {...this.state.filtersForm}
      const updatedFormElement = {...updatedForm["nextElection"]}
      let options = [
        {value:'', displayValue: 'All Years'}
      ]
      for (let i in this.props.years) {
        const year = this.props.years[i];
        options.push({value: year, displayValue: year})
      }
      updatedFormElement.elementConfig = {
        ...updatedFormElement.elementConfig,
        'options': options
      }
      updatedFormElement.years = this.props.years;
      updatedForm["nextElection"] = updatedFormElement;
      this.setState({filtersForm: updatedForm});
  }

  formSubmitHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const formData = {};
    for (let key in this.state.filtersForm) {
      formData[key] = this.state.filtersForm[key].value
    }
    logger.log(formData);
  }

  render() {
    console.log("Test");
    console.log(this.state.filtersForm.nextElection.elementConfig)
     const form = Object.entries(this.state.filtersForm).map(([key, formElement]) => (
      <Input
        key={key}
        label={formElement.label}
        elementType={formElement.elementType}
        elementConfig={formElement.elementConfig}
        value={formElement.value}
        changed={(event) => formElement.inputChangedHandler(event, key)} />
      )
    )
    const content = {form: form};
    return renderContent(content);
  }

  // render() {
  //   const formElementArray = [];

  //   for (let key in this.state.filtersForm) {
  //     const updatedFormElement = {
  //       ...this.state.filtersForm[key]
  //     }
  //     if (this.props.years && key === "nextElection"){
  //       updatedFormElement.elementConfig = {
  //         ...updatedFormElement.elementConfig,
  //         'options': this.props.years.map((year) => ({value: year, displayValue: year}))
  //       }
  //     }
  //     formElementArray.push({
  //       id: key,
  //       config: updatedFormElement
  //     })
  //   }


}

export default FiltersBar;

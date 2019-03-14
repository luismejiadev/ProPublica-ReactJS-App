import React, { Component } from 'react'
import './DropDownMenu.css';


class DropDownMenu extends Component {
  state = {
    open: false,
    value: null
  }
  menuClickedHandler = (event) => {
    console.log("clicked");
    event.preventDefault();
    this.setState({open: !this.state.open})
  }

  optionClickedHandler = (event, value) => {
    event.preventDefault();
    this.setState({open: !this.state.open, value: value});
    this.props.clicked({target:{value: value}});
  }

  render () {
    const options = (this.props.options)? (
      this.props.options.map(option=>
        (<a className="dropdown-item" href="" key={option}
            value={option}
            onClick={(event) => this.optionClickedHandler(event, option)}>{option}</a>)
    )): [];

    return (
        <li className={(this.state.open)? "nav-item dropdown show" :"nav-item dropdown"}>
          <a  className="nav-link dropdown-toggle" href="" id="navbarDropdown"
              role="button" data-toggle="dropdown" ariahaspopup="true"
              aria-expanded={this.state.open}
              onClick={this.menuClickedHandler}>
            {this.props.title +  " : " + this.props.value}
          </a>
          <div className={(this.state.open)? "dropdown-menu show" :" dropdown-menu "} aria-labelledby="navbarDropdown">
            {options}
          </div>
        </li>
      )
  }
}

export default DropDownMenu;
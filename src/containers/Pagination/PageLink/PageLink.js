import React from 'react'
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import './PageLink.css';

const pageLink = (props) => {
  let content = props.pageNumber;

  if (props.goToFirst) content = <span aria-hidden="true">&laquo;</span>

  if (props.goToLast){
    content = <span aria-hidden="true">&raquo;</span>;
  }
  const clickHandler = (event) => {
    event.preventDefault();
    const queryString = new URLSearchParams(props.location.search);
    queryString.set("page", props.pageNumber);
    // here we force to re-render by changing location search
    props.history.replace({...props.location, search: queryString.toString()})
  }
  return (content)?(
    <li className="page-item">
      <Link to={{pathname:props.location.pathname}} className="page-link"
        onClick={clickHandler}>
        {content}
      </Link>
    </li>
  ): null;
};

export default withRouter(pageLink);
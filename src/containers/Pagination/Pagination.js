import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Pagination.css';
import renderContent from './Pagination.jsx';

import PageLink from './PageLink/PageLink';
import Utils from '../../utils/utils';


class Pagination extends Component {

  getPaginationInfo (currentPage, pageLimit, steps=5) {
    const totalCount = Math.ceil(this.props.totalRecords/pageLimit);
    const currentGroup = Math.floor((currentPage-1)/steps);
    let start = (currentPage > steps )? currentGroup * steps + 1: 1
    if (currentPage === totalCount) start = Math.max(1, currentPage - steps);
    const end = (start + steps < totalCount)? start + steps : totalCount +1
    // const end =
    const pageRange = Utils.range(start, end, 1, false);
    const limit = pageRange.length -1
    const result = {
      'previous': (pageRange[0] > 1)? pageRange[0]-1: null,
      'range': pageRange,
      'current': currentPage,
      'next': (pageRange[limit] < totalCount)? pageRange[limit] + 1 : null,
      'description': `Showing ${Math.max(1, (currentPage -1) * pageLimit + 1)} to ${Math.min(this.props.totalRecords, currentPage * pageLimit) } of ${this.props.totalRecords} entries`
    }
    return (totalCount > 1)? result: {}
  }

  render() {
    const pages = this.getPaginationInfo(this.props.currentPage, this.props.pageLimit);
    const items = [];
    if (pages.previous) items.push(<PageLink key={pages.previous} goToFirst="true" pageNumber={pages.previous}/>);
    if (pages.range){
      pages.range.map( p => items.push(<PageLink key={p} pageNumber={p} />) )
    }
    if (pages.next) items.push(<PageLink key={pages.next} goToLast="true" pageNumber={pages.next} />);

    return renderContent({description: pages.description, items:items});
  }
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  currentPage:PropTypes.number,
  pageLimit: PropTypes.number,
  onPageChanged: PropTypes.func
};


export default Pagination;
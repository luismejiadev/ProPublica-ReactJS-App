 import React from 'react';


 export default (content) => (
  <div className="CongressPeople">
    <div className="row">
      <div className="sidebar hidden">
        <a className="toggleFilter" onClick={content.toogleFilters}><i className="fas fa-filter"></i></a>
        {(content.showFilters)?(
        <div id="filterContainer">
        {content.filters}
        </div>
        ): null}
      </div>
      <div className="col-md-9 col-xs-12 Content">
        <div className="row">
          <div className="col-sm-8 text-left">
            {content.pageLimit}
          </div>
        </div>
        <div className="row">
          {content.rows}
        </div>
        {content.pagination}
      </div>
    </div>
  </div>
);
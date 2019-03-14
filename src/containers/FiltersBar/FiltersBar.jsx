import React from 'react';

export default (content) => (
 <div className="FiltersBar navbar navbar-default navbar-fixed-top">
  <div className="container">
    <div id="navbar-filter">
      <form className="navbar-form" role="search">
        {content.form}
      </form>
    </div>
  </div>
</div>
);
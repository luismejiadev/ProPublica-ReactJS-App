import React from 'react';

export default (content) => (
(content)? (
  <div className="row ContentFooter">
    <div className="col-sm-6 text-left">
        {content.description}
    </div>
    <div className="col-sm-6 text-right">
    <ul className="pagination">
      {content.items}
    </ul>
    </div>
  </div>

): null);
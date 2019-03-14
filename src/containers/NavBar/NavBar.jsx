import React from 'react';

export default (content) => (
<nav className="NavBar navbar navbar-expand-lg navbar-dark bg-dark">
  <a className="navbar-brand" href="/">
    <img src={content.logo} className="AppLogo" alt="logo" />
  </a>
  <button className="navbar-toggler" type="button" datatoggle="collapse"
      datatarget="#navbarSupportedContent" aria-controls="navbarSupportedContent"
      aria-expanded="false" aria-label="Toggle navigation"
      onClick={content.menuClickHandler}>
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className={content.menuOpen? "collapse navbar-collapse show": "collapse navbar-collapse"} id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
       {content.chamberMenu}
       {content.sessionMenu}
    </ul>
    <form className="form-inline my-2 my-lg-0">
      {content.searchInput}
    </form>
  </div>
</nav>
);
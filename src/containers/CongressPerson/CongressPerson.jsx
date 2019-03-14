import React from 'react';
import Utils from '../../utils/utils';
import { Link } from 'react-router-dom';

export default (content) => (
  <div className="CongressPerson col-md-4">
    <div className="content text-center">
      <Link to={"/congressperson/"+ content.id} >
        <h3>{content.short_title + ' ' + content.full_name}</h3>
        <div className="m-b-sm">
           <img alt="Profile" height="80" className="rounded-circle" src={ Utils.getImageProfile(content.facebook_account, 'facebook') } />
        </div>

        <p className="font-bold info">
          <span title="Party">{content.partyName}</span>
          <span title="State"><i className="fas fa-flag-usa"></i> {content.stateName}</span>
          <span title="Next Election"><i className="far fa-calendar-alt"></i>{content.next_election}</span>
        </p>
      </Link>
      <div className="text-center SocialNetworks">
        <p>
          { content.networks.map(network => (
              <a key={network.iconClass} href={network.url}>
                <i className={network.iconClass}></i>
              </a>
            )
          )}
          <Link to={{
            pathname:"congressperson/"+ content.id,
            state: { address: content.office }
          }} className="fas fa-map-marked-alt" />
        </p>
      </div>
    </div>
  </div>
)
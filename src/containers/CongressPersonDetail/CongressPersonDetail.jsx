import React from 'react';
import Utils from '../../utils/utils';
import { Link } from 'react-router-dom';
import Maps from '../Maps/Maps';

export default (content) => (
  <div className="CongressPerson col-md-4">
    <div className="content text-center">
      <Link to={"/congressperson/"+ content.id} >
        <h3>{content.short_title + ' ' + content.full_name}</h3>
        <div className="m-b-sm">
           <img alt="Profile" height="80" className="rounded-circle" src={ Utils.getImageProfile(content.facebook_account, 'facebook') } />
        </div>

        <p className="font-bold info">
          <span title="Party">{(content.party === 'R')?<i className="fas fa-republican">Republican</i>:(<i className="fas fa-democrat"> Democrat</i>)}</span>
          <span title="State"><i className="fas fa-flag-usa"></i> {content.stateName}</span>
          <span title="Next Election"><i className="far fa-calendar-alt"></i>{content.next_election}</span>
        </p>
      </Link>
      <div className="text-center SocialNetworks">
        <p>
          { content.networks.map(network => (
              <a key={network.iconClass} href={network.url} target="_blank">
                <i className={network.iconClass}></i>
              </a>
            )
          )}
        </p>
      </div>
      {(content.roles)?<Maps isMarkerShown address="455 Dirksen Senate Office Building" />: null}
       <div>
        <h4>{content.full_name}'s Roles</h4>
          <ul className="CongressPersonRoles">
            {content.roles}
          </ul>
       </div>
    </div>
  </div>
)
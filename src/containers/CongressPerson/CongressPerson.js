import React, { Component } from 'react';

// import CongressPersonRole from '../../components/CongressPersonRole/CongressPersonRole';
// import Maps from '../Maps/Maps';

import './CongressPerson.css';
import renderContent from './CongressPerson.jsx';

class CongressPerson extends Component {
  state = {
    data: null,
    loading: false
  }

  componentDidMount() {
    const memberId = (this.props.match)? this.props.match.params.id : null;
    if (memberId) {
      if (!this.state.data || (this.state.data && this.state.data["id"] !== memberId)){
        this.setState({loading: true});
        // sample API call
        console.log(memberId);
        const url = `https://api.propublica.org/congress/v1/members/${memberId}.json`;
        fetch(url, {
          headers: new Headers({
            'X-API-Key': 'd0ywBucVrXRlMQhENZxRtL3O7NPgtou2mwnLARTr',
          }),
        })
        .then((res) => res.json())
        .then((data) => {
          console.log("data loaded");

          const memberInfo = {...data.results[0]};

          memberInfo["id"] = memberInfo.member_id;
          memberInfo["party"] = memberInfo.current_party;
          memberInfo['full_name'] = [
            memberInfo.first_name,
            (memberInfo.middle_name !== null && memberInfo.middle_name !== "")? memberInfo.middle_name: '',
            memberInfo.last_name
          ].join(" ");

          console.log(memberInfo);
          this.setState({data: memberInfo, loading: false});
        })
        .catch(error => {
          console.log(error);
          this.setState({loading: false})
        })
      }
    } else {
      this.setState({data: this.props.data, loading: false})
    }
  }

  render() {
    const partyOptions = {
      'R': <i className="fas fa-republican">Republican</i>,
      'D': <i className="fas fa-democrat"> Democrat</i>,
    }
    const data = this.state.data;
    const partyName = (data && data.party)? partyOptions[data.party] || data.party: '';
    const networks = (data) ? [
      {url: (data.url)? data.url: "", iconClass: "fas fa-link"},
      {url: (data.twitter_account)? "https://twitter.com/" + data.twitter_account: "", iconClass: "fab fa-twitter"},
      {url: (data.facebook_account)? "https://www.facebook.com/" + data.facebook_account: "", iconClass: "fab fa-facebook-f"},
      {url: (data.youtube_account)? "https://www.youtube.com/" + data.youtube_account: "", iconClass: "fab fa-youtube"}
    ]: [];
    const content = {...data, networks:networks, partyName: partyName};
    return renderContent(content);
  }
  //   let person = null;
  //   if ( this.state.data === undefined || this.state.data === null ){
  //     person = <Spinner />
  //   } else {
  //     const data = this.state.data;

  //     const roles = (data.roles)? data.roles.map(role => <CongressPersonRole key={role.start_date} data={role} />) : null

  //     person = (
  //       <div className="CongressPerson">
  //         <img src={"https://graph.facebook.com/" + data.facebook_account + "/picture"}/>
  //         <Link to={{
  //             pathname:"congressperson/"+ data.id,
  //             state: { address: this.props.address }
  //           }}>
  //           <h3>{data.short_title} {data.full_name}</h3>
  //         </Link>
  //        <p>{data.party}</p>
  //        <p>{data.state}</p>
  //        <p>{data.next_election}</p>
  //        <p>Address: {this.props.address}</p>
  //         {(roles)?<Maps isMarkerShown address="455 Dirksen Senate Office Building" />: null}
  //        <div>
  //         <h4>{data.full_name}'s Roles</h4>
  //           <ul className="CongressPersonRoles">
  //             {roles}
  //           </ul>
  //        </div>
  //      </div>
  //     )
  //   }
  //   return person;
  // }

}


export default (CongressPerson);
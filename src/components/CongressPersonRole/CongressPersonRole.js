import React from 'react'
import './CongressPersonRole.css';

const congressPersonRole = (props) =>{
  let data = props.data;
  let committees;

  if (data !== undefined){
      committees = (data.committees !== undefined)? (
      <div className="committees">{
        data.committees.map((committee) => (
          <p key={committee.code} >
            {committee.title} {committee.name} from {committee.begin_date} to {committee.end_date}
          </p>)
        )
      }</div>) : null;
      data = ([data.title, " from ",  data.start_date, " to ", data.end_date, " at ", data.chamber,"."].join(""))
  } else {
    data = null;
  };
  return (
    <div>
      <h3>{data}</h3>
      {committees}
    </div>
  )
}

export default congressPersonRole
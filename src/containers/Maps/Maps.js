import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { compose, withProps } from 'recompose'

import Settings from '../../settings/settings';

class MapComponent extends Component {
  state = {
    lat: 0,
    lng: 0,
    zoom: 15
  }
  componentDidMount() {
      let geocoder = new window.google.maps.Geocoder();
      console.log( this.props.address);
      geocoder.geocode( { 'address': this.props.address}, (results, status) => {
          if (status === 'OK') {
            console.log("loading address location");
            this.setState(
            {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            }
            )
          } else {
              console.log('Geocode was not successful for the following reason:', status);
          }
      })
    }
    render() {
      const { lat, lng } = this.state;
      console.log(lat, lng );
      return lat && lng ? <GoogleMap
          defaultZoom={this.state.zoom}
          defaultCenter={{ lat, lng }}
      >
        <Marker position={{ lat: lat, lng: lng }} />
      </GoogleMap> : <div>Loading...</div>
    }
}

export default compose(
  withProps({
      googleMapURL: ('https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=' + Settings.MAPS_API_KEY),
      loadingElement: (<div style={{ height: '100%' }} />),
      containerElement: (<div style={{ height: '400px' }} />),
      mapElement: (<div style={{ height: '100%' }} />)
  }),
  withScriptjs,
  withGoogleMap)(MapComponent)
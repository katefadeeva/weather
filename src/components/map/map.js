import React, { Component }from 'react';
import SwapiService from "../../services/swapi-service";

export default class Map extends Component {
  state = {
    swapiService: new SwapiService(),
    latitude: null,
    longitude: null,
    map: null
  }

  componentDidUpdate(prevProps) {
    const {latitude, longitude} = this.props;
    if (latitude !== prevProps.latitude || longitude !== prevProps.longitude) {
      this.setState({
        latitude: latitude.toFixed(2).replace(/\./g, "°") + "'",
        longitude: longitude.toFixed(2).replace(/\./g, "°") + "'"
      })
      this.map(latitude, longitude);
    }
  }

  map = (latitude, longitude) => {
    console.log(latitude, longitude)
    window.mapboxgl.accessToken = 'pk.eyJ1Ijoia2F0ZXJpbmFmYWRlZXZhIiwiYSI6ImNraHhkZ2V5NjI1OXQyeGt6bGk3b241cWoifQ.ML5LvbW0F7LihFa_TMr5Gw';
    let map = new window.mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [longitude.toFixed(2),latitude.toFixed(2)], // starting position [lng, lat]
      zoom: 9 // starting zoom
    });
  }

  render() {
    const { latitude, longitude} = this.state;
    return (
        <React.Fragment>
          <div className="map__city" id="map"></div>
          <div className="map">
            <p>Latitude {latitude}</p>
            <p>Longitude {longitude}</p>
          </div>
        </React.Fragment>

    );
  }
}


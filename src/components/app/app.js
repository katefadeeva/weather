import React, { Component }from 'react';
import Weather from "../weather";

export default class App extends Component {

  state = {
    latitude: 0,
    longitude: 0,
    data: null,
    lang: 'ru',
  }

  success = (pos) => {
    const crd = pos.coords;
    this.getCity(crd.latitude, crd.longitude);
  };

  getCity = (latitude, longitude) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=3c9b3ff83ae44d249c0976d2c966c8d1`;
    fetch(url)
        .then(res => (res.json()))
        .then(data => (
            this.setState({
              latitude: data.results[0].annotations.DMS.lat.split("'")[0] + "'",
              longitude: data.results[0].annotations.DMS.lng.split("'")[0] + "'",
              data: data.results[0].components
            })
        ))
  }



  getImage = (city) => {

  }





  position = navigator.geolocation.getCurrentPosition(this.success);

  render() {
    const { latitude, longitude, data, lang} = this.state;

    return (
          <div className="wrapper">
            <Weather data={data} lang={lang}/>
            <div className="lat"><p>Ширина: {latitude}</p>
              <p>Долгота: {longitude}</p>
              <div id='map'></div>
            </div>

          </div>
    )
  }
}
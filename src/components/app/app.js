import React, { Component }from 'react';
import Weather from "../weather";
import Map from "../map";
import SwapiService from "../../services/swapi-service";

export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
    city: null,
    country: null,
    latitude: null,
    longitude: null,
    lang: 'en'
  }

  success = async (pos) => {
    const crd = pos.coords;
    let data = await this.state.swapiService.getCity(crd.latitude, crd.longitude, this.state.lang);
    // console.log(data);
    let image = await this.state.swapiService.getImage(data.city);
    const body = document.querySelector('body');
    body.style.backgroundImage = `url("${image.urls.full}")`;
    this.setState({
      city: data.city + ", ",
      country: data.country,
      latitude: crd.latitude,
      longitude: crd.longitude
    });
  }

  position = navigator.geolocation.getCurrentPosition(this.success);

  render() {
    const { latitude, longitude, lang, city, country} = this.state;
    return (
        <div className="wrapper">
          <Weather city={city} country={country} lang={lang}/>
          <Map latitude={latitude} longitude={longitude}/>
        </div>
    )
  }
}
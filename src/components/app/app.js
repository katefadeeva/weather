import React, {Component, Fragment} from 'react';
import Weather from "../weather";
import Map from "../map";
import SwapiService from "../../services/swapi-service";
import Spinner from "../spiner";

export default class App extends Component {
  swapiService = new SwapiService();

  state = {
    city: null,
    country: null,
    latitude: null,
    longitude: null,
    lang: 'en',
    loading: true,
    error: false,
  }

  success = async (pos) => {
    const crd = pos.coords;
    let data = await this.swapiService.getCity(crd.latitude, crd.longitude, this.state.lang);
    let image = await this.swapiService.getImage(data.city);
    const body = document.querySelector('body');
    body.style.backgroundImage = `url("${image.urls.full}")`;
    this.setState({
      city: data.city + ", ",
      country: data.country,
      latitude: crd.latitude,
      longitude: crd.longitude,
      loading: false
    });
  }

  position = navigator.geolocation.getCurrentPosition(this.success);

  render() {
    const { loading, city, country, lang, latitude, longitude } = this.state;

    const spinner = loading ? <Spinner /> : null;

    return (
        <Fragment>
          <div className="wrapper">
            {spinner}
            <Weather city={city} country={country} lang={lang}/>
            <Map latitude={latitude} longitude={longitude}/>
          </div>
        </Fragment>
    )
  }
}

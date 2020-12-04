import React, { Component }from 'react';
import SwapiService from "../../services/swapi-service";
import Future from "../future";

export default class Weather extends Component {
  state = {
    swapiService: new SwapiService(),
    city: null,
    country: null,
    lang: 'en',
    weatherNow: null,
    feels_like: null,
    wind: null,
    humidity: null,
    sky: null
  }

  componentDidUpdate(prevProps) {
    const {city, country, lang} = this.props;
    if (city !== prevProps.city || lang !== prevProps.lang || country !== prevProps.country) {
      this.setState({
        city: city,
        country: country,
        lang: lang
      });
      this.weather(city);
    }
  }

  weather = async (city) => {
    const data = await this.state.swapiService.getWeather(city);
    const weather = data.list[0];

    this.setState({
      weatherNow: Math.round(weather.main.temp) + "°",
      feels_like: Math.round(weather.main.feels_like) + "°",
      humidity: weather.main.humidity + "%",
      wind: Math.round(weather.wind.speed) + " m/s",
      sky: weather.weather[0].description
    })
  }


  render() {
    const {city, country, weatherNow, feels_like, wind, humidity, sky} = this.state;
    let date = new Date();

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric'
    };

    let dateNow = this.lang === 'ru' ? date.toLocaleString("ru", options) : date.toLocaleString("en-US", options);
    return (
        <div className="weather">
          <h1 className="title">{city} {country}</h1>
          <p className="date">{dateNow}</p>
          <div className="weather__temp">
            <p>{weatherNow}</p>
            <ul>
              <li>{sky}</li>
              <li>Feels like: {feels_like}</li>
              <li>Wind: {wind}</li>
              <li>Humidity: {humidity}</li>
            </ul>
          </div>
          <Future />
        </div>

    )
  }
}
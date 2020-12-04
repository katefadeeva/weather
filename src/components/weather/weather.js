import React, { Component }from 'react';

export default class Weather extends Component {
  state = {
    data: this.props.data,
    city: null,
    country: null,
    lang: 'ru'
  }

  componentDidUpdate(prevProps) {
    const {data, lang} = this.props;
    if (data !== prevProps.data || lang !== prevProps.lang) {
      this.setState({
        city: data.city + ', ',
        country: data.country,
        lang: lang
      })
      this.getWeather(data.city, lang);
    }
  }

  getWeather = (city, lang) => {
    console.log(city);
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${lang}&cnt=3&units=metric&appid=c1205feb4b280c6c52a55700d47217de`;
    fetch(url)
        .then(res => (res.json()))
        .then(date => (console.log(date)))
  }

  render() {
    const {city, country} = this.state;
    return (
        <div className="weather">
          <h1 className="title">{city} {country}</h1>
          <p className="date">Дата</p>
        </div>

    )
  }
}
import React, { Component }from 'react';
import SwapiService from "../../services/swapi-service";
import moment from "moment";

export default class Future extends Component {

  swapiService = new SwapiService();

  state = {
    city: null,
    country: null,
    future: [0,0,0,0],
  }

  componentDidUpdate(prevProps) {
    const {city, country, lang} = this.props;
    if (city !== prevProps.city || lang !== prevProps.lang || country !== prevProps.country) {
      this.setState({
        city: city,
        country: country,
        lang: lang
      });
      this.futureWeather(city, country, lang);
    }
  }

  futureWeather = async (city, country, lang) => {
    const data = await this.swapiService.getFutureWeather(city, country, lang);
    console.log(data.data);
    this.setState({
      future: data.data
    })
  }

  average = (a,b) => {
    const nums = [a, b];
    return Math.round(nums.reduce((a, b) => (a + b)) / nums.length);
  }

  render() {
    const { future } = this.state

    return(
        <div className="future">
          <div>
            <p className="weekday">{moment(future[1].datetime).format('dddd')}</p>
            <p className="temp">{`${this.average(future[1].max_temp, future[1].min_temp)}°`}</p>
          </div>
          <div>
            <p className="weekday">{moment(future[2].datetime).format('dddd')}</p>
            <p className="temp">{`${this.average(future[2].max_temp, future[1].min_temp)}°`}</p>
          </div>
          <div>
            <p className="weekday">{moment(future[3].datetime).format('dddd')}</p>
            <p className="temp">{`${this.average(future[3].max_temp, future[1].min_temp)}°`}</p>
          </div>
        </div>
    );
  }
}
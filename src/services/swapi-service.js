export default class SwapiService {

  _apiWeather = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=c1205feb4b280c6c52a55700d47217de';
  _apiCity = 'https://api.opencagedata.com/geocode/v1/json?key=3c9b3ff83ae44d249c0976d2c966c8d1';
  _apiImage ='https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&client_id=rmyJB21avylZGgXGuwCEBZOjHLLLOo0DxJf8bRbej68';
  _apiFuture = 'https://api.weatherbit.io/v2.0/forecast/daily?key=f8c49291f20045759b8db07033b496cf&days=4';


  getResource = async (api, url) => {
    const res = await fetch(`${api}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${api}${url}, received ${res.status}`)
    }
    return await res.json();
  }

  getCity = async (latitude, longitude, lang) => {
    const cityRes = await this.getResource(this._apiCity, `&q=${latitude}+${longitude}&language=${lang}`);
    return cityRes.results[0].components;
  }

  getImage = async (city) => {
    const imageRes = await this.getResource(this._apiImage,`&query=${city} nature`)
    return imageRes;
  }

  getWeather = async (city) => {
    const weatherRes = await this.getResource(this._apiWeather, `&q=${city}`)
    return weatherRes;
  }

  getFutureWeather = async (city, country, lang) => {
    const futureRes = await this.getResource(this._apiFuture, `&city=${city}&country=${country}&lang=${lang}`);
    return futureRes;
  }
}
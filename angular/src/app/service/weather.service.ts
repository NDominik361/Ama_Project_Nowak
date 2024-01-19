// weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '066804da053339cbc0ea51b904f52566';
  //private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiUrl2 = 'https://api.weatherbit.io/v2.0/current?city=Wien&key=fe7274e2ca274ab1812c1731cddbfa01&include=minutely';
  private apiUrl4 = 'http://api.weatherbit.io/v2.0/forecast/daily?lat=51.5072&lon=-0.1276&key=fe7274e2ca274ab1812c1731cddbfa01&include=minutely';
  private apiUrl3 = 'https://api.weatherbit.io/v2.0/forecast/daily';


  constructor(private http: HttpClient) { }

  getWeather(city: string | "Wien", start: Date, end: Date): Observable<any> {
    
    //const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}`;
    const url2 = `${this.apiUrl2}`

    if(city == ""){
      city = "Zürich";
    }
    if(start == null){
      start == new Date().toISOString;
    }
    if(end == null){
      end == new Date().toISOString;
    }
    const url3 = `${this.apiUrl3}?city=${city}&start_date=${start}&end_date=${end}&key=fe7274e2ca274ab1812c1731cddbfa01&include=daily`
    return this.http.get(url3);
  }


}

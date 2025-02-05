import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from './weather';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  private apiUrl = 'https://api.openweathermap.org/data/2.5/';
  private apiKey = 'ad13d611df07ea4080f86499b5728e5c'

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<Weather>{
    const options = new HttpParams()
      .set('units', 'metric')
      .set('q', city)
      .set('appId', this.apiKey);
      return this.http.get<Weather>(this.apiUrl + 'weather', { params: options});
  }
}

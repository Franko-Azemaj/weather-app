import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Weather, WeatherForecast } from './weather';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  private apiUrl = 'https://api.openweathermap.org/data/2.5/';
  private apiKey = 'ad13d611df07ea4080f86499b5728e5c'
  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<Weather>{
    return this.http.get<Weather>(this.apiUrl + 'weather', { params: this.getOptions(city) });
  }

  private getOptions(city: string){
    return new HttpParams()
    .set('units', 'metric')
    .set('q', city)
    .set('appId', this.apiKey)
  }

  getForecast(city: string): Observable<WeatherForecast[]> {
    return this.http.get<{ list: WeatherForecast[]}>(this.apiUrl + 'forecast', { params: this.getOptions(city) }).pipe(
      map((data: { list: WeatherForecast[] }) => data.list.filter(forecast => forecast.dt_txt.toString().includes('12:00:00')))
    )
  }
}

// https://api.openweathermap.org/data/2.5/forecast?q=London,uk&APPID=ad13d611df07ea4080f86499b5728e5c
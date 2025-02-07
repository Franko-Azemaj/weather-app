import { Component } from '@angular/core';
import { Weather, WeatherForecast } from '../weather';
import { WeatherService } from '../weather.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {
  weather : Weather | undefined;
  forcasts$: Observable<WeatherForecast[]> | undefined;

  constructor(private weatherService: WeatherService){ }

  search(city: string){
    this.weatherService.getWeather(city).subscribe(wforecasr => this.weather = wforecasr);
    this.forcasts$ = this.weatherService.getForecast(city);
  }
}

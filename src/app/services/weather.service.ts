import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  baseUrl = ' https://api.openweathermap.org/data/2.5/forecast/daily';
  iconURL = 'http://openweathermap.org/img/wn/10d@2x.png';
  
  constructor(private http: HttpClient) { }

  getWeatherInformation(cityId: string) {
    return this.http.get(`${this.baseUrl}?cnt=1&id=${cityId}&APPID=73284042a4b5eb7fabb01f1a3078338e`)
  }
}

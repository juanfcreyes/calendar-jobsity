import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherInformation(cityId: number) {
    return this.http.get(`${environment.baseUrl}?cnt=1&id=${cityId}&APPID=${environment.APPID}`)
  }
}

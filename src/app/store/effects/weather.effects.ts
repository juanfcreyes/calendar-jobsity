import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { WeatherService } from 'src/app/services/weather.service';
import { searchWeather, succesLoadWeather } from '../actions/weather.actions';

@Injectable()
export class WeatherEffects {

    constructor(private actions$: Actions, private weatherService: WeatherService) { }
    
    searchWeather$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(searchWeather),
            switchMap(action => this.weatherService.getWeatherInformation(action.cityId)
                .pipe(map(data => succesLoadWeather(data)))
            )
        )
    });
}   
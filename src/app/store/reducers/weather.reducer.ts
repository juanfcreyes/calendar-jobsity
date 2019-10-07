import { createReducer, on } from '@ngrx/store';
import { searchWeather, succesLoadWeather, clearCurrentWeather } from '../actions/weather.actions';

export interface WeatherState {
    currentWeather: any;
}
export const weatherState: WeatherState = {
    currentWeather: {}
};

const _weatherReducer = createReducer(weatherState,
    on(searchWeather, (state: WeatherState) => {
        return { ...state };
    }),
    on(succesLoadWeather, (state: WeatherState, data: any) => {
        return { ...state, currentWeather: data };
    }),
    on(clearCurrentWeather, () => {
        return { currentWeather: {} };
    })
    
);

export function weatherReducer(state: WeatherState, action) : WeatherState {
    return _weatherReducer(state, action);
}
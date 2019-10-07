import { createAction, props } from '@ngrx/store';

export const searchWeather = createAction('[Weather] searchWeather', props<{cityId: number}>());
export const succesLoadWeather = createAction('[Weather] successLoadWeather', props<Object>());
export const clearCurrentWeather = createAction('[Weather] clearCurrentWeather');


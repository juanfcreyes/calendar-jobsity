import { ActionReducerMap } from '@ngrx/store';
import { CalendarState, calendarReducer } from './reducers/calendar.reducer';
import { MonthState, monthReducer } from './reducers/month.reducer';
import { CityState, cityReducer } from './reducers/city.reducer';

export interface AppState {
    calendarState: CalendarState;
    monthState: MonthState;
    cityState: CityState;
}

export const appReducers : ActionReducerMap<AppState> = {
    calendarState: calendarReducer,
    monthState: monthReducer,
    cityState: cityReducer
}
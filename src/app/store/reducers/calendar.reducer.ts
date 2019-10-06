import { createReducer, on } from '@ngrx/store';
import { addMonth, setCurrentMonthName } from '../actions/calendar.actions';

export interface CalendarState {
    monthMap: Object;
    currentMonthName: string;
}

export const calendarState: CalendarState = {
    monthMap: {},
    currentMonthName: ''
};

const _calendarReducer = createReducer(calendarState,
    on(addMonth, (state: CalendarState, month: Month) => {
        state.monthMap[month.monthReference] = month.daysMap;
        return { ...state, };
    }), on(setCurrentMonthName, (state: CalendarState, { monthName }) => {
        return { ...state, currentMonthName: monthName };
    })
);

export function calendarReducer(state: CalendarState, action) : CalendarState {
    return _calendarReducer(state, action);
}

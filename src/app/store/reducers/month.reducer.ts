import { createReducer, on } from '@ngrx/store';
import { setCurrentMonth } from '../actions/month.actions';

export interface MonthState {
    currentMonth: Month;
}
export const monthState: MonthState = {
    currentMonth: {}
};

const _monthReducer = createReducer(monthState,
    on(setCurrentMonth, (state: MonthState, month: Month) => {
        return { ...state, currentMonth: month };
    })
);

export function monthReducer(state: MonthState, action) : MonthState {
    return _monthReducer(state, action);
}
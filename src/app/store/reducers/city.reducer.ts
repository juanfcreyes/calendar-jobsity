import { createReducer, on } from '@ngrx/store';
import { setCities } from '../actions/city.actions';

export interface CityState {
    cities: City[];
}

export const cityState: CityState = {
    cities: [],
};

const _cityReducer = createReducer(cityState,
    on(setCities, (state: CityState, { cities } ) => {
        return { ...state, cities  };
    })
);

export function cityReducer(state: CityState, action) : CityState {
    return _cityReducer(state, action);
}

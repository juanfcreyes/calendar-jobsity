import { createAction, props } from '@ngrx/store';
export const setCities = createAction('[City] setCities', props<{ cities: City[] }>());


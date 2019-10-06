import { createAction, props } from '@ngrx/store';
export const setCities = createAction('[Calendar Component] setCities', props<{ cities: City[] }>());


import { createAction, props } from '@ngrx/store';

export const addMonth = createAction('[Calendar Component] addMonth', props<Month>());
export const setCurrentMonthName = createAction('[Calendar Component] setCurrentMonthName', props<{monthName: string}>());


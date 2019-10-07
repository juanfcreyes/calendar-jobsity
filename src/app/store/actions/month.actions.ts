import { createAction, props } from '@ngrx/store';

export const setCurrentMonth = createAction('[Month] setCurrentMonth', props<Month>());
export const setReminderDay = createAction('[Month] addReminderDay', props<DayInformation>());
import { createAction, props } from '@ngrx/store';

export const setCurrentMonth = createAction('[Calendar Component] setCurrentMonth', props<Month>());
export const setReminderDay = createAction('[Calendar Component] addReminderDay', props<DayInformation>());
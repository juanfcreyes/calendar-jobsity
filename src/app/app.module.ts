import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DayComponent } from './components/day/day.component';
import { ReminderFormComponent } from './components/modals/reminder-form/reminder-form.component';
import { ReminderListComponent } from './components/modals/reminder-list/reminder-list.component';
import { ReminderBodyComponent } from './components/reminder-body/reminder-body.component';
import { ReminderHeaderComponent } from './components/reminder-header/reminder-header.component';
import { appReducers } from './store/app.metareducer';
import { WeatherEffects } from './store/effects/weather.effects';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CalendarComponent,
    DayComponent,
    ReminderFormComponent,
    ReminderListComponent,
    ReminderBodyComponent,
    ReminderHeaderComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    EffectsModule.forRoot([ WeatherEffects ]),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      features: {
        pause: true,
        persist: true
      }
    })
  ],
  entryComponents: [
    ReminderFormComponent,
    ReminderListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

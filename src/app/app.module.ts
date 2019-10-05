import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DayComponent } from './components/day/day.component';
import { ReminderModalComponent } from './components/reminder-modal/reminder-modal.component';
import { ReminderListComponent } from './components/reminder-list/reminder-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CalendarComponent,
    DayComponent,
    ReminderModalComponent,
    ReminderListComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  entryComponents: [
    ReminderModalComponent,
    ReminderListComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
